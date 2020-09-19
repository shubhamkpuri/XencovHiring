module.exports = {
    convertData(data){
        return {
        country : data['Country'],
        region : data['Region'],
        item_type :data['Item Type'],
        sales_channel : data['Sales Channel'],
        order_priority : data['Order Priority'],
        order_date : data['Order Date'],
        order_id : data['Order ID'],
        ship_date : data['Ship Date'],
        units_sold : data['Units Sold'],
        unit_price : data['Unit Price'],
        unit_cost : data['Unit Cost'],
        total_revenue : data['Total Revenue'],
        total_cost : data['Total Cost'],
        total_profit : data['Total Profit']
        }
    }
}