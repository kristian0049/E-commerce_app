//example of api https://api.mobygames.com/v1/genres?api_key=MOBYGAMES_API
require('dotenv').config();
const {createQuery, fetch_arr} = require("./db/insertIntoCategory.js")
const api = process.env.MOBYGAMES_API;
const superagent = require('superagent');
const db = require('./db/index.js');
const url = `https://api.mobygames.com/v1/genres?api_key=${api}`;

async function fetch_categories(){
    const product_category = await db.query("SELECT id FROM product_category","");
    return product_category.rows;
}
//need to create a query to add games to db


// superagent.get(url)
// .set('accept','json')
// .end(async (err,res)=>{
//   await fetch_categories();
// });
(async()=>{
    const categories = await fetch_categories();
    console.log(categories[0].id);
    for(let i =  0; i < categories.length; i++){
        const gameUrl = "https://api.mobygames.com/v1/games?api_key=moby_DcJcAQ9PJiqRnN9sCq7ooFEI5OP&limit=10&genre="+categories[i].id;
        console.log(gameUrl)
        
        setTimeout( async ()=> {
            const res = await superagent.get(gameUrl).set('accept','json');
            console.log(res._body);
        },1500*(i+1));
        
    }
})();


