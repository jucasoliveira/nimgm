// @generated automatically by Diesel CLI.

diesel::table! {
    deliveries (id) {
        id -> Nullable<Integer>,
        item_name -> Text,
        quantity -> Integer,
        delivered_at -> Text,
    }
}

diesel::table! {
    sales (id) {
        id -> Nullable<Integer>,
        item_name -> Text,
        quantity -> Integer,
        sold_at -> Text,
    }
}

diesel::table! {
    stock (id) {
        id -> Nullable<Integer>,
        item_name -> Text,
        quantity -> Integer,
        #[sql_name = "type"]
        type_ -> Text,
    }
}

diesel::table! {
    users (id) {
        id -> Nullable<Integer>,
        name -> Text,
        surname -> Text,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    deliveries,
    sales,
    stock,
    users,
);
