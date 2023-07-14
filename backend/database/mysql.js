const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-completed','root','Shahu@123',{
    dialect:'mysql',
    host:'localhost'
})
module.exports = sequelize; 