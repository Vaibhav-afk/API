const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) =>{
    res.status(200).json({
        message: 'Handling GET request to /users'
    });
});

router.post('/', (req,res,next) =>{
    res.status(201).json({
        message: 'Handling POST request to /users'
    });
});

module.exports = router;
