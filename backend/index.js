const express = require ('express');
const helmet = require('helmet');
const app = express();
const port = 3000;
const db = require('./db/index.js');
const user = require('./routes/user/index.js');

app.use(helmet());
app.use(express.json());

app.use('/user',user);

app.get('/', async (req, res) => {//Upon entering the site 
    res.send("Hello from Kris");
});

app.listen(port, () => {
    console.log('Example app listening on port' + port);
});

//GET, POST, PUT, DELETE
//Retrieve only JSON

//To send to front-end use res.json()

//Need route for Log in(Optional)
//Need route for Sign up
//Need route for account that retrieves account information
//Need route for updating account information

//Need routing for retrieving all products
//Need routing for retrieving products that have filtered used on them
//Need routing for retrieving product once selected 

//Route for removing an item from the cart
//Route for adding an item to the cart
//Route for checking out
//Route for submmitting purchase

