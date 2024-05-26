const express = require ('express');
const app = express();
const port = 3000;

const pg = require('pg');



app.get('/', (req, res) => {
    res.send('Hello world! + '+ _res );
   
});

app.listen(port, () => {
    console.log('Example app listening on port' + port);
});

