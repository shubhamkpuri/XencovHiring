const express = require('express');
const bodyParser = require('body-parser');

const db = require('./config/database');



db.authenticate()
.then(()=> console.log(`Database connected successfully`))
.catch((err)=> console.log('Error : '+err))
const app = express();


app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send("<h1> Please read Readme</h1>  ");
})

app.use('/records',require('./routes/records'));

const PORT = process.env.PORT || 3000;


app.listen(PORT, console.log(`Server started at ${PORT}`))