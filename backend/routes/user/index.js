//API endpoint to create a user/ register
//User will need to create a username, password, first name, last name and email

//API endpoint to check user log in details, fetch and log in
//This should check if username or password are in the database and are correct

//API endpoint to set user personnel details / user address 
//User can set these details upon paying or on their profile page
//User must set address line 1 , address line 2 is optional, city , postal code, telephone/phone number, mobile

//API endpoint to set user payment if user chooses to remember it otherwise delete after transaction finishes
//The user can set their payment options in profile or upon paying. When paying and no payment option is saved they can optionally save  it or choose not to
//Payment option can be Paypal or debit card with the provider's name, account number and expiration date

//API endpoint to fetch user address by user id
//Upon opening the profile page or when paying fetch user's address information if available

//api endpoint to fetch user payment by user id
//Upon opening the profile page or when paying fetch user's address information if available

const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {} = require('express-validator');

router.get('/', (req,res)=>{
    res.send("Hello from user file");
});

router.post('/register',(req,res)=>{
    const {username, password, email, first_name, last_name, telephone} = req.body;
    const created_at = new Date();
    const response = db.query('INSERT INTO public.user (username, password, first_name, last_name, telephone, created_at, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',[username, password, first_name, last_name, telephone, created_at, email  ])
    res.send(response.rows);
});

router.post('/login',(req,res)=>{

});

router.get('/user/:name',(req,res)=>{

});


//fetch user_address table values by user id
router.get('/user/:name/user_address', (req,res)=>{

});

//update user_address value by user id
router.put('/user/:name/user_address', (req, res) =>{

})



//Error handling is last, after all route calls

module.exports = router;