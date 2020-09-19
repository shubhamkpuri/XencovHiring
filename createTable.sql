/*Create DB and connect to DB then run the sql */
drop table if exists records;
create table records(
    region varchar(50),
    country varchar(50),
    item_type varchar(50),
    sales_channel varchar (50),
    order_priority varchar(1),
    order_date date,
    order_id int primary key,
    ship_date date,
    units_sold bigint,
    unit_price decimal,
    unit_cost decimal,
    total_revenue decimal,
    total_cost decimal, 
    total_profit decimal
);
