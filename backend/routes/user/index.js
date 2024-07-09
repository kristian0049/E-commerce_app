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
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

router.get('/', (req,res)=>{
    res.send("Hello from user file");
});

router.post('/register',
    body('email').notEmpty().isEmail().isLength({max:255}),
    body('username').trim().notEmpty().isString().not().isURL().isLength({max:255}),
    body('password').trim().notEmpty().isString().isStrongPassword({minLength:6,minUppercase:1,minNumbers:4,minSymbols:1}).not().isURL(),
    body('first_name').trim().notEmpty().isString().not().isURL().isLength({max:255}),
    body('last_name').trim().notEmpty().isString().not().isURL().isLength({max:255}),
    body('telephone').trim().notEmpty().isMobilePhone('any').not().isURL().isLength({max:255}),
    (req,res)=>{
    /*Check first if we had any issues with user input
    If we did, return otherwise create an account*/
    const result = validationResult(req);
    if(!result.isEmpty()){
        const errors = result.array();
        
        res.status(400).send(errors);
        return;
    }

    const {username, password, email, first_name, last_name, telephone} = req.body;
    const created_at = new Date();
    const response = db.query('INSERT INTO public.user (user    name, password, first_name, last_name, telephone, created_at, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',[username, password, first_name, last_name, telephone, created_at, email]);
    res.status(201).send("Your account was registered! :)");
});

router.post('/login',(req,res)=>{
    
});

router.get('/:name',(req,res)=>{

});


//fetch user_address table values by user id
router.get('/user/:name/user_address', (req,res)=>{

});



//update user_address value by user id
router.put('/user/:name/user_address', (req, res) =>{

})



//Error handling is last, after all route calls

module.exports = router;