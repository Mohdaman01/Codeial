const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
// const cookies = require('cookie-parser');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const port  = 3000;

app.use(express.urlencoded());
// app.use(cookies());
app.use(expressLayouts);
app.use(express.static('./assets'));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(session({
    name:'codeial',
    // TODO change the secert before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongoUrl: "mongodb://127.0.0.1:/codeial_development",
        collection: "sessions"
    } )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes')); 


app.listen(port,(err)=>{
    if(err){
        console.log(`error: ${err}`);
    }
    console.log(`sever is running on http://localhost:${port}`);
}) 