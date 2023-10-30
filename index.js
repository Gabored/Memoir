// Gabriel Olvera, Marian Sedano

// Memoir Project 

const express = require ('express');
const routes = require('./routes');

const app = express();

const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://mariansedano:1D5Hliam@cluster0.fqg0t96.mongodb.net/memoir?retryWrites=true&w=majority'

app.use('', routes)

app.get('', (req, res) => {
    res.send('api works!');
})


mongoose.connect(mongoUrl).then(client => {
    app.listen(3000, () => {
        console.log("app is running...");
    });
}).catch(err => {
    console.log('No se puede conectar', err);
})