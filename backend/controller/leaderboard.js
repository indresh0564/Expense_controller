const leaderboard_model = require('../models/leaderboard');

exports.leaderboard = async(req,res,next)=>{

await leaderboard_model.findAll()
.then((data)=>{
res.status(201).json(data);
})
.catch((err)=>{
    res.status(505).json({error:err});
})
}

// exports.update_leaderboard = async(req,res,next)=>{
//     const expense = req.body.expense;
//     console.log(req.user.id);
//     await leaderboard_model.findOne({where:{userId:req.user.id}})
//     .then((leaderboard)=>{
//         const preExpense = leaderboard.totalExpense;
//         const oriExpense = parseInt(preExpense)+parseInt(req.body.expense);
//         leaderboard.update({totalExpense:oriExpense});
//         res.status(201).json(leaderboard);
//     })
//     .catch((error)=>{
//         console.log(error);
//     })

// }
