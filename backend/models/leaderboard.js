const sequelize = require('../database/mysql');
const Sequelize = require('sequelize');

const leaderboard = sequelize.define('leaderboard',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    totalExpense:Sequelize.INTEGER,
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports = leaderboard;