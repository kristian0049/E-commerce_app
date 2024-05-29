const express = require ('express');
const app = express();
const port = 3000;

const db = require('./db/index.js');



app.get('/', async (req, res) => {
    const data = await db.query('SELECT NOW()',"");
    res.send( ""+data.rows[0].now );
});

app.listen(port, () => {
    console.log('Example app listening on port' + port);
});


//API endpoint to create a user

//API endpoint to check user log in details, fetch and log in

//API endpoint to set user personnel details, user address , user_payment

//API endpoiint to fetch user payment if saved, user address

//API endpoint to create a shopping session
//api endpoint to modify shoppint session

//API endpoint to store cart items
//api endpoint to update cart items if added or removed 