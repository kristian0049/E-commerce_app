const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


router.get('/', (req,res)=>{
    res.send("Hello from order file");
});
//API endpoint to fetch and/or create payment details

//API endpoint to create order items from cart items and after paying

//API endpoint to create order details once user submits after paying