const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port  = 3000;

app.use(expressLayouts);
app.use('/',require('./routes'));
app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.listen(port,(err)=>{
    if(err){
        console.log(`error: ${err}`);
    }
    console.log(`sever is running on http://localhost:${port}`);
})