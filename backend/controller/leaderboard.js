const sequelize = require('../database/mysql');
const Expense = require('../models/expense');
const User = require('../models/user');
const { expense } = require('./expense');

exports.leaderboard = async(req,res,next)=>{
    
    // const userAggregatedExpense =await Expense.findAll({
    //     attributes:['userId', [sequelize.fn('sum' , sequelize.col('expense.expense')) , 'totalExpense']],
    //     group:['userId']
    // });
    const users_leaderboard =await User.findAll({
        attributes:['id' , 'name' , [sequelize.fn('sum' , sequelize.col('expense')) , 'totalExpense']],
        include:[{
            model:Expense,
            attributes:[]  
        }],
        group:['user.id']
    });
console.log(users_leaderboard);
    // const userAggregatedExpense = {}
    // expenses.forEach(expense => {
    //     if(userAggregatedExpense[expense.userId]){
    //         userAggregatedExpense[expense.userId]=userAggregatedExpense[expense.userId]+expense.expense;  
    //     }else{
    //         userAggregatedExpense[expense.userId]=expense.expense;  
    //     }
    // });

    // const userLeaderBoardDetails = [];
    // users.forEach((user)=>{
    //     if(userAggregatedExpense[user.id]){
    //         userLeaderBoardDetails.push({name:user.name , totalExpense : userAggregatedExpense[user.id]});
    //     }else{
    //         userLeaderBoardDetails.push({name:user.name , totalExpense : 0 });
    //     }
    // })
    // userLeaderBoardDetails.sort((a,b)=>b.totalExpense-a.totalExpense);
    res.status(201).json(users_leaderboard);
}




