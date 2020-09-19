const Sequelize = require('sequelize');
require('dotenv').config()
module.exports =  new Sequelize(process.env.DB_DATABASENAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:'postgres',

    pool: {
        max : 5,
        min : 0,
        acquire :100000000,
        idle:10000
    }
})