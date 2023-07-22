const expense_model = require('../models/expense');
const leaderboard_model = require('../models/leaderboard');


exports.expense = (req, res, next)=>{
const {expense, description, category} = req.body;
     
    expense_model.create({expense:expense, description:description,category:category, userId:req.user.id})
    .then((result)=>{
        
    leaderboard_model.findOne({where:{userId:req.user.id}})
    .then((leaderboard)=>{
        const preExpense = leaderboard.totalExpense;
        if(preExpense === null){
            const oriExpense = parseInt(expense);
            leaderboard.update({totalExpense:oriExpense});
        }else{
            const oriExpense = parseInt(preExpense)+parseInt(expense);
            leaderboard.update({totalExpense:oriExpense});
        }
        res.status(201).json(leaderboard);

    })
    .catch((error)=>{
        console.log(error);
    })
    res.status(200).json({result:result});
    })
    .catch((err)=>{
    res.status(500).json({err:err});
})
}

exports.get_expenses = (req, res, next)=>{
   expense_model.findAll({where:{userId:req.user.id}})
   .then((expenses)=>{
    res.status(201).json(expenses);
   })
   .catch((err)=>{res.status(500).json({err:err});});
}

exports.delete_expense = (req,res,next)=>{
    const id = req.params.id;
    expense_model.destroy({where:{id:id,userId:req.user.id}});
}
