const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


router.get('/', (req,res)=>{
    res.send("Hello from product file");
});

//Api endpoint that searches a product either by product name OR category OR if in stock 

//Filter by category or by in stock or by name

//Filter by combinations category, stock, name

//If product is purchased decrease stock