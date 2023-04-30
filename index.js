const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const port  = 3000;

app.use(sassMiddleware({
    src:'./assets/scss', 
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'   
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));

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

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/',require('./routes')); 


app.listen(port,(err)=>{
    if(err){
        console.log(`error: ${err}`);
    }
    console.log(`sever is running on http://localhost:${port}`);
}) 