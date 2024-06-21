//example of api https://api.mobygames.com/v1/genres?api_key=MOBYGAMES_API
require('dotenv').config();
const api = process.env.MOBYGAMES_API;
const superagent = require('superagent');
const db = require('./db/index.js');
const url = `https://api.mobygames.com/v1/games?api_key=${api}`;

async function fetch_categories(){
    const product_category = await db.query("SELECT name FROM product_category","");
    console.log(product_category.rows);
}
//need to create a query to add games to db


superagent.get(url)
.set('accept','json')
.end(async (err,res)=>{
    fetch_categories();
    /* */
});
