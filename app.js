const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoute =require('./api/routes/users');
const orderRoute = require('./api/routes/orders');
const productRoute = require('./api/routes/products');

const uri = "mongodb+srv://Vaibhav:CnmPJnuphSR0YDp3@order.6qxof.mongodb.net/orders?retryWrites=true&w=majority";

mongoose.connect(uri,{ useNewUrlParser: true }).then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//handling CORS error
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//Routes for handling requests
app.use('/users',userRoute);
app.use('/orders',orderRoute);
app.use('/products',productRoute);


//handling 404 errors
app.use((req,res,next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//handling all other errors
app.use((error, req, res, next) =>{
    res.status(error.status || 599);
    res.json({
        error: {
            message: error.message 
        }
    });
});

module.exports = app;