const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


router.get('/', (req,res)=>{
    res.send("Hello from order file");
});

//API endpoint to fetch and/or create payment details
//create_order needs order detail, order_items and payment details
router.post('/create_order',(req,res,next) =>{
    const {user_id} = req.body;
    //a form of submitting the order where payment details should be processed ,etc
});

//If product is purchased decrease stock

//After customer purchased show order details
router.post('/order_details', (req,res) =>{

});
