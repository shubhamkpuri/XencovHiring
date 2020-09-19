const Sequelize = require('sequelize');
const db  = require('../config/database');

const Record = db.define('record',{
    region:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    country:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    item_type:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    sales_channel:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            isValidSalesChannel(value){
                if(!(value == 'Offline' || value == 'Online')){
                    throw new Error('Sales channel should be online or Offline only')
                }
            }
        }
    },
    order_priority:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    order_date:{
        type: Sequelize.DATEONLY,
        validate: {
            notEmpty: true,
        }
    },
    order_id:{
        type: Sequelize.NUMBER,
        primaryKey: true,
        validate: {
            notEmpty: true,
        }
    },
    ship_date:{
        type: Sequelize.DATEONLY,
        validate: {
            notEmpty: true,
        }
    },
    units_sold:{
        type: Sequelize.NUMBER,
        validate: {
            notEmpty: true,
        }
    },
    unit_price:{
        type: Sequelize.NUMBER,
        validate: {
            notEmpty: true,
        }
    },
    unit_cost:{
        type: Sequelize.NUMBER,
        validate: {
            notEmpty: true,
        }
    },
    total_revenue:{
        type: Sequelize.NUMBER,
        validate: {
            notEmpty: true,
            isCorrectTotalRevenue(value){
                if(parseFloat(value) != parseFloat(this.units_sold)*parseFloat(this.unit_price)){
                    throw new Error('TotalCost must be equal to unitsSold *  UnitPrice');
                }
            }
        }
    },
    total_cost:{
        type: Sequelize.NUMBER,
        validate: {
            notEmpty: true,
            isCorrectTotalCost(value){
                if(parseFloat(value) != parseFloat(this.units_sold)*parseFloat(this.unit_cost)){
                    throw new Error('TotalCost must be equal to unitsSold *  UnitCost');
                }
            }
        }
    },
    total_profit:{
        type: Sequelize.DECIMAL,
        validate: {
            notEmpty: true,
            isCorrectProfit(value){
                if (parseFloat(value) != parseFloat(this.total_revenue) - parseFloat(this.total_cost)) {
                    throw new Error('Profit must be equal to totalCost - totalRevenue');
                  }
            }
        }
    }
},{
    timestamps: false
  }
)

module.exports = Record;