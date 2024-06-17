use diesel::prelude::*;
use diesel::{AsChangeset, Insertable, Queryable};
use serde::{Deserialize, Serialize};

use crate::schema::*;

#[derive(Serialize, Deserialize, Debug, Clone, Queryable, AsChangeset)]
#[diesel(table_name = deliveries)]
pub struct Delivery {
    pub id: Option<i32>,
    pub item_name: String,
    pub quantity: i32,
    pub delivered_at: String,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = deliveries)]
pub struct NewDelivery {
    pub item_name: String,
    pub quantity: i32,
    pub delivered_at: String,
}

#[derive(Queryable, Serialize, Deserialize)]
#[diesel(table_name = sales)]
pub struct Sale {
    pub id: Option<i32>,
    pub item_name: String,
    pub quantity: i32,
    pub sold_at: String,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = sales)]
pub struct NewSale {
    pub item_name: String,
    pub quantity: i32,
    pub sold_at: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, Queryable, AsChangeset)]
#[diesel(table_name = stock)]
pub struct Stock {
    pub id: Option<i32>,
    pub item_name: String,
    pub quantity: i32,
    pub type_: String,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = stock)]
pub struct NewStock<'a> {
    pub item_name: &'a str,
    pub quantity: i32,
    pub type_: &'a str,
}

#[derive(Queryable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct User {
    pub id: Option<i32>,
    pub name: String,
    pub surname: String,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser<'a> {
    pub name: &'a str,
    pub surname: &'a str,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WasteManagement {
    pub item_name: String,
    pub quantity: i32,
    pub action: String, // "add" or "remove"
}
