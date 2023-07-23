const sequelize = require('../database/mysql');
const Expense = require('../models/expense');
const User = require('../models/user');
const { expense } = require('./expense');

exports.leaderboard = async(req,res,next)=>{
    
    const users_leaderboard =await User.findAll({
        attributes:['id' , 'name' , [sequelize.fn('sum' , sequelize.col('expense')) , 'totalExpense']],
        include:[{
            model:Expense,
            attributes:[]  
        }],
        group:['user.id'],
        order:['totalExpense', 'DESC']
    });

    res.status(201).json(users_leaderboard);
}




