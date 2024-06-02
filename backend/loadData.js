//example of api https://api.mobygames.com/v1/genres?api_key=MOBYGAMES_API
require('dotenv').config();
const api = process.env.MOBYGAMES_API;
const superagent = require('superagent');
const db = require('./db/index.js');
const url = `https://api.mobygames.com/v1/genres?api_key=${api}`;

//need to create a query to add games to db

superagent.get(url)
.set('accept','json')
.end(async (err,res)=>{
 

});
