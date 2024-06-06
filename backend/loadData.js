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
    const genres =res._body.genres;
    console.log(genres);
    const arr = []
    // for (let i = 0; i < genres.length; i++){
    //     const {genre_category, genre_name} = genres[i];

    //     if(genre_category === "Basic Genres"){
    //         arr.push(genre_name);
    //     }
    // }
    // console.log(genre_name);
});
