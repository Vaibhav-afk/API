const express = require('express');
const app = express();
const morgan = require('morgan');

const userRoute =require('./api/routes/users');
const orderRoute = require('./api/routes/orders');
const productRoute = require('./api/routes/products');

app.use(morgan('dev'));

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