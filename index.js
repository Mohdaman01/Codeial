const express = require('express');
const path = require('path');
const app = express();
const port  = 3000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`error: ${err}`);
    }
    console.log(`sever is running on http://localhost:${port}`);
})