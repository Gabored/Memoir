// Gabriel Olvera, Marian Sedano

// Memoir Project 

const express = require ('express');

 // const routes = require('./routes');

const app = express();


// const mongoose = require('mongoose');

const mongourl = "mongo url"

// app.use('',routes)

app.get('', (req, res) => {
    res.send('api works!');
})

app.listen (3000, ()=>{ // Set Up server at LocalHost 3000
    console.log('app is running');

})

