const sequelize = require('../database/mysql');
const Sequelize = require('sequelize');

const expense = sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        allowNUll:false,
        autoIncrement:true,
        primaryKey:true
    },
    expense:{ 
        type:Sequelize.INTEGER,
        allowNUll:false
    },
    description:{
        type:Sequelize.STRING,
        allowNUll:false 
    },
    category:{
        type:Sequelize.STRING,
        allowNUll:false 
    },
    userId:{
       type:Sequelize.INTEGER,
       allowNUll:false   
    }
});

module.exports = expense;