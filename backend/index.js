const Express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');

const sequelize = require('./database/mysql');
const user_routes = require('./routes/user');
const login_routes = require('./routes/login');
const expense_routes = require('./routes/expense');

const app = Express();

app.use(body_parser.json({extended:false}));
app.use(cors());
app.use(user_routes);
app.use(login_routes);
app.use(expense_routes);

sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>console.log(err));