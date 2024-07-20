const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const {encrypt, decrypt} = require('../../helper_functions/crypting.js');

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
    //Encrypt user details and upload to database
    const hashedPassword = await bcrypt.hash(password,salt);
    const enc_first = encrypt(first_name);
    const enc_last = encrypt(last_name);
    const enc_tele = encrypt(telephone);
    const enc_email = encrypt(email);

    const created_at = new Date();
    created_at.setMilliseconds(0);
    await db.query('INSERT INTO public.user (username, password, first_name, last_name, telephone, created_at, email, salt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',[username, hashedPassword, enc_first, enc_last, enc_tele, created_at, enc_email, salt]);
    res.status(201).send("Your account was registered! :)");
});

//API endpoint to check user log in details, fetch and log in
//This should check if username or password are in the database and are correct
//Use salt in database
router.post('/login',async (req,res)=>{
    const {username, password} = req.body;
    const response = await db.query('SELECT id, password FROM public.user WHERE username = $1 ',[username]);
    const resPass = response.rows[0].password;

    const resBool = await bcrypt.compare(password, resPass);

    if(!resBool){
        res.status(401).send("Invalid credetials!");
        return;
    }
    
    const userid = response.rows[0].id;

    res.status(200).json({user_id:userid});
});

//Fetch basic user info name,email,password etc
router.get('/:name', async (req,res)=>{
    const userId = req.body.user_id;

    const response = await db.query('SELECT username, first_name, last_name, telephone, email FROM public.user WHERE id = $1;',[userId]);

    if(response.rowCount === 0 ) {
        res.status(404).send("User not found!");
        return;
    }

    const {username, first_name, last_name, telephone, email} = response.rows[0];
    
    res.status(200).json({username, first_name:decrypt(first_name), last_name:decrypt(last_name), telephone:decrypt(telephone), email:decrypt(email)});
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

