const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts');
const bodyparser =require('body-parser');
// from passport authentication part.. for session cookie
const session = require('express-session');
const passport= require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { default: mongoose } = require('mongoose');
//for storing cookie in mongo
const MongoStore= require('connect-mongo');
//sass css 
// 

//director changes with sass
// app.use(sassmiddleware({
//               src:'/assets/Scss',
//               dest:'/assets/css',
//               //for debuging show in terminal
//               debug: true,
//               //for coding style
//               outputStyle: 'extended',
//               //if we use css where should it look into
//               prefix: '/css'

// }));
// app.use(sassMiddleware({
//     src: '/assets/Scss',
//     dest: '/assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));
//from cookie part
app.use(bodyparser.urlencoded({extended:false}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// for cookie session using passport.js
// app.use(session({
//              name: CODEIAL,//name for our cookie
//              //secret for encrypted form of cookie information
//              secret:'something',
//              saveUninitialized: false,
//              resave: false,
//              //for cookie session time
//              cookie:{
//                 //time in milliseconds
//                   maxAge: (1000*60*100)
//              }


// }));
//this is related to cookie sessions
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    //to make cokkie stored in my database
    store:  MongoStore.create({
        mongoUrl : "mongodb://0.0.0.0:27017/social_media_3",
         autoremove : "disabled",
     },function(err){
        //incase connection faceses errors
         console.log("error at mongo store",err || "connection established to store cookie");
     })
}));

app.use(passport.initialize());
app.use(passport.session());
//to make sure when server starts user gets signed out everytime---->
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
