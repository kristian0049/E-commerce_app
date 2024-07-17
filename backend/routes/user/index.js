const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
    async (req,res)=>{
    /*Check first if we had any issues with user input
    If we did, return otherwise create an account*/
    const result = validationResult(req);
    if(!result.isEmpty()){
        const errors = result.array();
        
        res.status(400).send(errors);
        return;
    }

    const salt = await bcrypt.genSalt(12);
    
    const {username, password, email, first_name, last_name, telephone} = req.body;
    
    const hashedPassword = await bcrypt.hash(password,salt);

    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const created_at = new Date();
    created_at.setMilliseconds(0);
    const response = db.query('INSERT INTO public.user (user    name, password, first_name, last_name, telephone, created_at, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',[username, hashedPassword, first_name, last_name, telephone, created_at, email]);
    res.status(201).send("Your account was registered! :)");
});

//API endpoint to check user log in details, fetch and log in
//This should check if username or password are in the database and are correct
//Use salt in database
router.post('/login',(req,res)=>{
    
});

//Fetch basic user info name,email,password etc
router.get('/:name',(req,res)=>{

});
//Update basic user info
router.post('/:name',(req,res)=>{
    
})

//API endpoint to fetch user address by user id
//Upon opening the profile page or when paying fetch user's address information if available
//fetch user_address table values by user id
router.get('/:name/user_address', (req,res)=>{

});

//API endpoint to set user personnel details / user address 
//update user_address value by user id
//User must set address line 1 , address line 2 is optional, city , postal code, telephone/phone number, mobile
router.put('/:name/user_address', (req, res) =>{

});

//API endpoint to set user payment if user chooses to remember it otherwise delete after transaction finishes
//The user can set their payment options in profile or upon paying. When paying and no payment option is saved they can optionally save  it or choose not to
//Payment option can be Paypal or debit card with the provider's name, account number and expiration date
//fetch user_payment

//api endpoint to fetch user payment by user id
//Upon opening the profile page or when paying fetch user's address information if available

router.get('/:name/user_payment', (req,res) =>{

});
//update user_payment
router.post('/:name/user_payment', (req, res) => {

});

//Error handling is last, after all route calls
module.exports = router;