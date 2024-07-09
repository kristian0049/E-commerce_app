const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


router.get('/', (req,res)=>{
    res.send("Hello from cart file");
});
//API endpoint to create a temporary shopping session and cart items once user logs in or enters the website

//API endpoint to add game product to cart 

//API endpoint to remove game product from cart  

//If product is purchased decrease stock

