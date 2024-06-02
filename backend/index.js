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
