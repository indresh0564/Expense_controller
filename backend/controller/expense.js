const expense_model = require('../models/expense');

exports.expense = (req, res, next)=>{
const {expense, description, category} = req.body;
expense_model.create({expense:expense, description:description,category:category})
.then((result)=>{
res.status(200).json({result:result});
})
.catch((err)=>{
    res.status(500).json({err:err});
})
}

exports.get_expenses = (req, res, next)=>{
   expense_model.findAll()
   .then((expenses)=>{
    res.status(201).json(expenses);
   })
}

exports.delete_expense = (req,res,next)=>{
    const id = req.params.id;
    expense_model.destroy({where:{id:id}});
}