const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

//Fetch shopping sessions with cart items when user enters the site
router.get('/', (req,res)=>{
    //If user returned to the site, fetch if there were items in the cart
    res.send("Hello from cart file");
});
//API endpoint to create a temporary shopping session and cart items once user logs in or enters the website

//API endpoint to add game product to cart
//Modify date, increment total  
router.post('/add',  async (req,res)=>{
    const {user_id} = req.body;
    const date = new Date();
    date.setMilliseconds(0);
    
    const response = await db.query('SELECT * FROM shopping_session WHERE user_id = $1',[user_id]);
    
    //if the rows return are 0, this means we have no current shopping session and should create one and return    
    if(response.rowCount === 0 ){
        const response = await db.query('INSERT INTO shopping_session (user_id, total, created_at) VALUES ($1,1,$2);', [user_id, date]);
        res.status(201).send("Created new shopping session!");
        return;
    }


    const {id, total} = response.rows[0];
    const newTotal = total + 1; 
    await db.query('UPDATE shopping_session SET total = $1, modified_at=$2 WHERE id = $3;',[newTotal, date, id]);

    res.status(200).send("Updated the shopping session!");
});

//API endpoint to remove game product from cart  
router.post('/remove', async (req, res)=>{
    const {user_id} = req.body;
    const date = new Date();
    date.setMilliseconds(0);

    const response = await db.query('SELECT * FROM shopping_session WHERE user_id = $1', [user_id]);
    console.log(response.rows[0]);

    if(response.rowCount === 0 ){
        res.status(404).send("There is no shopping session available!");
        return;
    }
    const {id, total} = response.rows[0];

    if(total === 0) {
        res.status(405).send("Cannot remove, because cart is empty!");
        return;
    }
    const newTotal = total - 1;

    await db.query('UPDATE shopping_session SET total = $1, modified_at=$2 WHERE id=$3;',[newTotal, date, id]);

    res.status(200).send("Removed item from cart!");
});


module.exports = router;