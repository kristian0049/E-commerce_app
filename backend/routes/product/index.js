const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');


router.get('/', (req,res)=>{
    res.send("Hello from product file");
});

//Get product by id 
router.get('/:id', async (req,res) => {
    const id = req.params.id;

    //Fetch product category
    //When fetching product by id check if there is a discount and if we have in stock
    //by getting discount table and product_inventory
});


//Get all products
router.get("/all", async (req,res) =>{
    //When fetching all products check if there is a discount
});


//Api endpoint that searches a product either by product id OR category OR if in stock 
router.get("/all/:genre.:sort", async (req, res) => {
    //When fetching all products check if there is a discount
});
//Filter by category or by in stock or by name
router.get("all/:genre", async(req,res)=>{
    //When fetching all products check if there is a discount
});


//Filter by category or by in stock or by name
router.get("all/:sort", async(req,res)=>{
    //When fetching all products check if there is a discount
});

//If product is purchased decrease stock
router.post("/:id", async(req, res)=>{

});