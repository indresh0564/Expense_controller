const Express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');

const sequelize = require('./database/mysql');
const routes = require('./routes/user');

const app = Express();

app.use(body_parser.json({extended:false}));
app.use(cors());
app.use(routes);

sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>console.log(err));