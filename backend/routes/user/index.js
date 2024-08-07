const express = require('express');
const router = express.Router();
const db = require('../../db/index.js');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const {encrypt, decrypt} = require('../../helper_functions/crypting.js');
//THink about username route
router.get('/', (req,res)=>{
    res.send("Hello from user file");
});

//Register user
//First sanitize and validate
router.post('/register',
    body('email').trim().notEmpty().isEmail().isLength({max:255}),
    body('username').trim().notEmpty().isString().not().isURL().isLength({max:255}),
    body('password').trim().notEmpty().isString().isStrongPassword({minLength:6,minUppercase:1,minNumbers:4,minSymbols:1}).not().isURL(),
    body('first_name').trim().notEmpty().isString().not().isURL().isLength({max:255}),
    body('last_name').optional().trim().notEmpty().isString().not().isURL().isLength({max:255}),
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
    
    const {username, password, email, first_name, last_name, telephone} = req.body;
    //Encrypt user details and upload to database
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password,salt);
    const enc_first = encrypt(first_name);
    const enc_last = encrypt(last_name);
    const enc_tele = encrypt(telephone);
    const enc_email = encrypt(email);

    const created_at = new Date();
    created_at.setMilliseconds(0);//Remove the milliseconds
    await db.query('INSERT INTO public.user (username, password, first_name, last_name, telephone, created_at, email) VALUES ($1, $2, $3, $4, $5, $6, $7);',[username, hashedPassword, enc_first, enc_last, enc_tele, created_at, enc_email]);
    res.status(201).send("Your account was registered! :)");
});

//API endpoint to check user log in details, fetch and log in
//This should check if username or password are in the database and are correct
router.post('/login',async (req,res)=>{
    const {username, password} = req.body;
    const response = await db.query('SELECT id, password FROM public.user WHERE username = $1 ',[username]);
    const resPass = response.rows[0].password;

    if(response.rowCount === 0){
        res.status(404).send("User not found, please check your credentials!");
        return;
    }

    const resBool = await bcrypt.compare(password, resPass);

    if(!resBool){
        res.status(401).send("Invalid credetials!");
        return;
    }
    
    const userid = response.rows[0].id;

    res.status(200).json({user_id:userid});
});

//Fetch basic user info name,email,password etc
router.get('/:username',body('user_id').trim().notEmpty().isNumeric(),async (req,res)=>{
    const userId = req.body.user_id;
    const response = await db.query('SELECT username, first_name, last_name, telephone, email FROM public.user WHERE id = $1;',[userId]);

    if(response.rowCount === 0 ) {
        res.status(404).send("User details not found!");
        return;
    }

    const {username, first_name, last_name, telephone, email} = response.rows[0];
    
    res.status(200).json({username, first_name:decrypt(first_name), last_name:decrypt(last_name), telephone:decrypt(telephone), email:decrypt(email)});
});

//Update basic user info
router.put('/:username',
    body('user_id').trim().notEmpty().isNumeric(),
    body('email').trim().notEmpty().isEmail().isLength({max:255}),
    body('username').trim().notEmpty().isString().not().isURL().isLength({max:255}), 
    body('first_name').trim().notEmpty().isString().not().isURL().isLength({max:255}),
    body('last_name').optional().trim().notEmpty().isString().not().isURL().isLength({max:255}),
    body('telephone').trim().notEmpty().isMobilePhone('any').not().isURL().isLength({max:255})
,async (req,res)=>{
    
    const result = validationResult(req);
    if(!result.isEmpty()){
        const errors = result.array();
        
        res.status(400).send(errors);
        return;
    }

    //Check if the values are not the same as the current ones by user id
    //If not the same then proceed to update

    const {email, username, first_name, last_name, telephone, user_id} = req.body;

    //If the user wants to update the username, we check if it exists in the database then continue
    const getValuesToCompare = await db.query('SELECT 1 FROM public.user WHERE username = $1 AND NOT id = $2;',[username, user_id]);
  
    if(getValuesToCompare.rowCount > 0) {
        res.status(409).send("Username already Exists!");
        return;
    }

    const enc_first = encrypt(first_name);
    const enc_last = encrypt(last_name);
    const enc_tele = encrypt(telephone);
    const enc_email = encrypt(email);
    const modified_at = new Date();
    modified_at.setMilliseconds(0);
 
    await db.query('UPDATE public.user SET username = $1, first_name = $2, last_name= $3, email = $4, telephone = $5, modified_at = $6 WHERE id = $7;',[username, enc_first, enc_last, enc_email, enc_tele,  modified_at, user_id]);

    res.status(200).send("Account details updated!");
});

//route for checking if the password is the same when trying to update password
router.put('/:username/update_password',
body('user_id').trim().notEmpty().isNumeric(),  
body('password').trim().notEmpty().isString().isStrongPassword({minLength:6,minUppercase:1,minNumbers:4,minSymbols:1}).not().isURL(),
async (req,res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        const errors = result.array();
        
        res.status(400).send(errors);
        return;
    }

    const {password, user_id} = req.body;

    const getPassword = await db.query('SELECT password FROM public.user WHERE id = $1;',[user_id]);

    if(getPassword.rowCount === 0){
        res.status(404).send("Not found!");
        return;
    }



    const resBool = await bcrypt.compare(password, getPassword.rows[0].password);

    if(resBool === true){
        res.status(409).send("The password is the same!");
        return;
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password,salt);
    const modified_at = new Date();
    modified_at.setMilliseconds(0);
    
    await db.query('UPDATE public.user SET password = $1, modified_at = $2 WHERE id = $3;',[ hashedPassword, modified_at, user_id]);

    res.status(200).send("Password successfully updated!");
});

//API endpoint to fetch user address by user id
//Upon opening the profile page or when paying fetch user's address information if available
//fetch user_address table values by user id
router.get('/:name/user_address', 
    body('user_id').trim().notEmpty().isNumeric()
    ,async (req,res)=>{
    const {user_id} = req.body;
    
    const response = await db.query('SELECT address_line1, address_line2, city, postal_code, country, telephone FROM user_address WHERE user_id = $1;',[user_id]);

    if( response.rowCount === 0 ){
        res.status(404).send("No address for this user!");
        return;
    }
    const isAddressLine2 =  response.rows[0].address_line2 === null ? null : decrypt(response.rows[0].address_line2);
    const obj = {
        address_line1:decrypt(response.rows[0].address_line1),
        address_line2:isAddressLine2,
        city: decrypt(response.rows[0].city),
        postal_code: decrypt(response.rows[0].postal_code),
        country: decrypt(response.rows[0].country),
        telephone: decrypt(response.rows[0].telephone)
    }
    res.status(200).json(obj);
    
});

//API endpoint to set user personnel details / user address 
//update user_address value by user id
//User must set address line 1 , address line 2 is optional, city , postal code, telephone/phone number, mobile
router.post('/:name/user_address', 
    body('user_id').trim().notEmpty().isNumeric(),
    body('address_line1').trim().notEmpty().isString().isLength({min:1, max:255}),
    body('address_line2').optional().trim().notEmpty().isString().isLength({min:1, max:255}),
    body('city').trim().notEmpty().isString().isLength({min:1, max:255}),
    body('postal_code').trim().notEmpty().isString().isLength({min:1, max:55}),
    body('country').trim().notEmpty().isString().isLength({min:1, max:255}),
    body('telephone').trim().notEmpty().isMobilePhone('any').isLength({min:1, max:255}),
    async (req, res) =>{
    const {user_id, address_line1, address_line2, city, postal_code, country, telephone} = req.body;
    const response = await db.query('SELECT address_line1, address_line2, city, postal_code, country, telephone FROM user_address WHERE user_id = $1;',[user_id]);
    
    const enc_add_line1 = encrypt(address_line1);
    const enc_city = encrypt(city);
    const enc_postal_code = encrypt(postal_code);
    const enc_country = encrypt(country);
    const enc_tele = encrypt(telephone);

    if(address_line2){
        const enc_add_line2 = encrypt(address_line2);
        if( response.rowCount === 0 ){
            await db.query('INSERT INTO user_address (address_line1, address_line2, city, postal_code, country, telephone, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7);',[enc_add_line1, enc_add_line2, enc_city, enc_postal_code, enc_country, enc_tele, user_id])
            res.status(201).send("No data was found with this user, so new data was created and addded as new!");
            return;
        }
    
        await db.query('UPDATE user_address SET address_line1 = $1, address_line2 = $2, city = $3, postal_code = $4, country = $5, telephone = $6, WHERE user_id = $7 ;',[enc_add_line1, enc_add_line2, enc_city, enc_postal_code, enc_country, enc_tele, user_id])
    
        res.status(200).send("User address has been updated!");
    }else{
        if( response.rowCount === 0 ){
            await db.query('INSERT INTO user_address (address_line1,  city, postal_code, country, telephone,  user_id) VALUES ($1, $2, $3, $4, $5, $6);',[enc_add_line1, enc_city, enc_postal_code, enc_country, enc_tele, user_id])
            res.status(201).send("No data was found with this user, so new data was created and addded as new!");
            return;
        }
    
        await db.query('UPDATE user_address SET address_line1 = $1,  city = $2, postal_code = $3, country = $4, telephone = $5 WHERE user_id = $6 ;',[enc_add_line1, enc_city, enc_postal_code, enc_country, enc_tele, user_id])
    
        res.status(200).send("User address has been updated!");
    }
   
});

//API endpoint to set user payment if user chooses to remember it otherwise delete after transaction finishes
//The user can set their payment options in profile or upon paying. When paying and no payment option is saved they can optionally save  it or choose not to
//Payment option can be Paypal or debit card with the provider's name, account number and expiration date
//fetch user_payment

//api endpoint to fetch user payment by user id
//Upon opening the profile page or when paying fetch user's address information if available

router.get('/:name/user_payment', async (req,res) =>{
    const {user_id} = req.body;
    const response = await db.query('SELECT id, payment_type, provider, account_no, expiry FROM user_payment;');

    if(response.rowCount === 0){
        res.status(404).send("User payment data was not found!");
        return;
    }

    const obj = {
        id: response.rows[0].id,
        payment_type: response.rows[0].payment_type,
        provider: decrypt(response.rows[0].provider),
        account_no: decrypt(response.rows[0].account_no),
        expiry: response.rows[0].expiry
    };

    res.status(200).json(obj);
});
//create user_payment
router.post('/:name/user_payment',
    body('user_id').trim().notEmpty().isNumeric(), 
    body('account_no').trim().notEmpty().isCreditCard({'provider':'visa' | 'mastercard'}),
    body('payment_type').trim().notEmpty().isString().isLength({min:1,max:128}),
    body('provider').trim().notEmpty().isString().isLength({min:1,max:128}),
    body('expiry').trim().notEmpty().isDate({format:'MM/YY', delimiters:['/']}),
    async (req, res) => {
        const {user_id, account_no, payment_type, provider, expiry} = req.body;
        const response = await db.query('SELECT 1 FROM user_payment WHERE user_id = $1;',[user_id]);
        const encrypted_data = [user_id, payment_type, encrypt(provider), encrypt(account_no), expiry];
        //Need to check if account_no is the same as other existing
        await db.query("INSERT INTO user_payment (user_id, payment_type, provider, account_no, expiry) VALUES ($1, $2, $3, $4, $5);",encrypted_data);
        res.status(201).send("Created a new user payment option!");
        return;
});

//update user_payment
router.put('/:name/user_payment/:id',
    body('account_no').trim().notEmpty().isCreditCard({'provider':'visa' | 'mastercard'}),
    body('payment_type').trim().notEmpty().isString().isLength({min:1,max:128}),
    body('provider').trim().notEmpty().isString().isLength({min:1,max:128}),
    body('expiry').trim().notEmpty().isDate({format:'MM/YY', delimiters:['/']}),
    async (req, res) => {
        const {id} = req.params;
        const { account_no, payment_type, provider, expiry} = req.body;
        const response = await db.query('SELECT 1 FROM user_payment WHERE id = $1;',[id]);
        
        if(response.rowCount === 0){
            res.status(404).send('Payment option not found!');
            return;
        }

        const encrypted_data = [payment_type, encrypt(provider), encrypt(account_no), expiry, id];

        await db.query('UPDATE user_payment SET payment_type = $1 , provider = $2, account_no = $3, expiry = $4 WHERE id = $5;',encrypted_data);
        res.status(200).send("Updated user payment option!");
        return;
});

router.delete('/:name/user_payment/:id', async(req,res)=>{
    const {id} = req.params;

    await db.query('DELETE FROM user_payment WHERE id = $1',[id]);

    res.status(200).send("Payment deleted!");

})

//Error handling is last, after all route calls
module.exports = router;

