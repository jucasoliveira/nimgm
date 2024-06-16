#[macro_use]
extern crate diesel;

use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;
mod models;
mod schema;

use chrono::prelude::*;
use chrono::Datelike;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;
use log::info;
use models::{Delivery, NewDelivery, NewSale, NewStock, Stock, WasteManagement};
use schema::deliveries::dsl::*;
use schema::stock::dsl::*;
use schema::{deliveries, sales, stock};
use std::env;

type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

#[derive(Serialize)]
struct StandardResponse<T>
where
    T: Serialize,
{
    status: String,
    data: Option<T>,
}

#[get("/get-stock")]
async fn get_stock(pool: web::Data<DbPool>) -> impl Responder {
    let mut conn = pool.get().unwrap();

    let results = stock.load::<Stock>(&mut conn).expect("Error loading stock");

    info!("New list: {:?}", results);

    let response = StandardResponse {
        status: "success".to_string(),
        data: Some(results),
    };

    HttpResponse::Ok().json(response)
}

#[post("/deliveries")]
async fn accept_delivery(
    pool: web::Data<DbPool>,
    delivery: web::Json<NewDelivery>,
) -> impl Responder {
    let mut conn = pool.get().expect("couldn't get db connection from pool");

    info!("New delivery: {:?}", delivery);

    // Insert the delivery record
    diesel::insert_into(deliveries::table)
        .values(&*delivery)
        .execute(&mut conn)
        .expect("Error inserting new delivery");

    // Check if the item exists in stock
    let existing_stock = stock::table
        .filter(stock::item_name.eq(&delivery.item_name))
        .first::<Stock>(&mut conn)
        .optional()
        .expect("Error querying stock");

    if let Some(mut existing) = existing_stock {
        // Update the stock quantity if the item exists
        existing.quantity += delivery.quantity;
        diesel::update(stock::table.filter(stock::id.eq(existing.id)))
            .set(stock::quantity.eq(existing.quantity))
            .execute(&mut conn)
            .expect("Error updating stock");
    } else {
        // Insert a new stock entry if the item does not exist
        let new_stock = NewStock {
            item_name: &delivery.item_name,
            quantity: delivery.quantity,
            type_: "Default Type", // Replace with actual type if available
        };
        diesel::insert_into(stock::table)
            .values(&new_stock)
            .execute(&mut conn)
            .expect("Error inserting new stock");
    }

    let response = StandardResponse {
        status: "success".to_string(),
        data: Some(delivery.into_inner()),
    };

    HttpResponse::Ok().json(response)
}

#[get("/delivery-history")]
async fn get_delivery_history(pool: web::Data<DbPool>) -> impl Responder {
    let mut conn = pool.get().unwrap();

    let now = Utc::now();
    let start_of_month = now
        .with_day(1)
        .unwrap()
        .with_hour(0)
        .unwrap()
        .with_minute(0)
        .unwrap()
        .with_second(0)
        .unwrap();
    let end_of_month = if now.month() == 12 {
        (now + chrono::Duration::days(1))
            .with_month(1)
            .unwrap()
            .with_day(1)
            .unwrap()
            .with_hour(0)
            .unwrap()
            .with_minute(0)
            .unwrap()
            .with_second(0)
            .unwrap()
    } else {
        (now.with_month(now.month() + 1)
            .unwrap()
            .with_day(1)
            .unwrap()
            .with_hour(0)
            .unwrap()
            .with_minute(0)
            .unwrap()
            .with_second(0)
            .unwrap())
    };
    let results = deliveries
        .filter(delivered_at.ge(start_of_month.to_rfc3339()))
        .filter(delivered_at.lt(end_of_month.to_rfc3339()))
        .load::<Delivery>(&mut conn)
        .expect("Error loading stock");

    info!("New list: {:?}", results);

    let response = StandardResponse {
        status: "success".to_string(),
        data: Some(results),
    };

    HttpResponse::Ok().json(response)
}

#[post("/sales")]
async fn process_sale(pool: web::Data<DbPool>, mut sale: web::Json<NewSale>) -> impl Responder {
    let mut conn = pool.get().unwrap();

    let now: DateTime<Utc> = Utc::now();
    sale.sold_at = now.to_rfc3339();
    info!("New sale: {:?}", sale);

    // Insert the sale record
    diesel::insert_into(sales::table)
        .values(&*sale)
        .execute(&mut conn)
        .expect("Error inserting new sale");

    // Check if the item exists in stock
    let existing_stock = stock::table
        .filter(stock::item_name.eq(&sale.item_name))
        .first::<Stock>(&mut conn)
        .optional()
        .expect("Error querying stock");

    if let Some(mut existing) = existing_stock {
        // Deduct the stock quantity if the item exists
        existing.quantity -= sale.quantity;
        if existing.quantity < 0 {
            return HttpResponse::BadRequest().body("Insufficient stock");
        }
        diesel::update(stock::table.filter(stock::id.eq(existing.id)))
            .set(stock::quantity.eq(existing.quantity))
            .execute(&mut conn)
            .expect("Error updating stock");
    } else {
        return HttpResponse::BadRequest().body("Item not found in stock");
    }

    let response = StandardResponse {
        status: "success".to_string(),
        data: Some(sale.into_inner()),
    };

    HttpResponse::Ok().json(response)
}

#[post("/reports")]
async fn pull_reports() -> impl Responder {
    "Report generated"
}

async fn waste_management(
    pool: web::Data<DbPool>,
    waste: web::Json<WasteManagement>,
) -> impl Responder {
    let mut conn = pool.get().expect("couldn't get db connection from pool");

    info!("Waste management: {:?}", waste);

    // Check if the item exists in stock
    let existing_stock = stock::table
        .filter(stock::item_name.eq(&waste.item_name))
        .first::<Stock>(&mut conn)
        .optional()
        .expect("Error querying stock");

    if let Some(mut existing) = existing_stock {
        // Deduct the wasted quantity from the stock if the item exists
        existing.quantity -= waste.quantity;
        if existing.quantity < 0 {
            return HttpResponse::BadRequest().body("Insufficient stock to remove waste");
        }
        diesel::update(stock::table.filter(stock::id.eq(existing.id)))
            .set(stock::quantity.eq(existing.quantity))
            .execute(&mut conn)
            .expect("Error updating stock");
    } else {
        return HttpResponse::BadRequest().body("Item not found in stock");
    }

    let response = StandardResponse {
        status: "success".to_string(),
        data: Some(waste.into_inner()),
    };

    HttpResponse::Ok().json(response)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::builder()
        .filter_level(log::LevelFilter::Info)
        .init();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<SqliteConnection>::new(database_url);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    info!("Starting server at http://localhost:8080");

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header()
                    .max_age(3600),
            )
            .service(get_stock)
            .service(accept_delivery)
            .service(get_delivery_history)
            .service(process_sale)
            .app_data(waste_management)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
