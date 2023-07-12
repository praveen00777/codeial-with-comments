const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts');
const bodyparser =require('body-parser');
//from cookie part
app.use(bodyparser.urlencoded({extended:false}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
