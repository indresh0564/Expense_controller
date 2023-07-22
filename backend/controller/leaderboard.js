const Expense = require('../models/expense');
const User = require('../models/user');

exports.leaderboard = async(req,res,next)=>{
    const expenses =await Expense.findAll();
    const users =await User.findAll();

    const userAggregatedExpense = {}
    expenses.forEach(expense => {
        if(userAggregatedExpense[expense.userId]){
            userAggregatedExpense[expense.userId]=userAggregatedExpense[expense.userId]+expense.expense;  
        }else{
            userAggregatedExpense[expense.userId]=expense.expense;  
        }
    });

    const userLeaderBoardDetails = [];
    users.forEach((user)=>{
        if(userAggregatedExpense[user.id]){
            userLeaderBoardDetails.push({name:user.name , totalExpense : userAggregatedExpense[user.id]});
        }else{
            userLeaderBoardDetails.push({name:user.name , totalExpense : 0 });
        }
    })
    userLeaderBoardDetails.sort((a,b)=>b.totalExpense-a.totalExpense);
    res.status(201).json(userLeaderBoardDetails);
}




