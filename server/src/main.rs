use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/get-stock")]
async fn get_stock() -> impl Responder {
    "Response"
}

#[post("/deliveries")]
async fn accept_delivery() -> impl Responder {
    "Delivery accepted"
}

#[post("/sales")]
async fn process_sale() -> impl Responder {
    "Sale processed"
}

#[post("/stock-take")]
async fn take_stock() -> impl Responder {
    "Stock taken"
}

#[post("/reports")]
async fn pull_reports() -> impl Responder {
    "Report generated"
}

#[post("/waste-management")]
async fn waste_management() -> impl Responder {
    "Waste management"
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(get_stock)
            .service(accept_delivery)
            .service(process_sale)
            .service(take_stock)
            .app_data(waste_management)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
