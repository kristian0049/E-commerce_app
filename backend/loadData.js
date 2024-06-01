//example of api https://api.mobygames.com/v1/genres?api_key=MOBYGAMES_API
require('dotenv').config();
const api = process.env.MOBYGAMES_API;

const express = require ('express');
const app = express();
const port = 3000;


app.get(`https://api.mobygames.com/v1/genres?api_key=${api}`, async (req, res) => {
    console.log(res);
});

app.listen(port, () => {
    console.log('Example app listening on port' + port);
});

