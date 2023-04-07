const express = require('express');
const app = express();
const port  = 3000;

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`error: ${err}`);
    }
    console.log(`sever is running on http://localhost:${port}`);
})