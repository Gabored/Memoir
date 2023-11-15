// Gabriel Olvera, Marian Sedano

// Memoir Project 

const express = require('express'); // esto es un import
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const rutas = require('./routes');

const app = express(); // express es una clase que me permite crear la aplicación

const port = process.env.PORT || 5000;

const secretKey = process.env.SECRET_KEY;

app.use('', rutas);

app.get('', (req, res) => {
    res.send('api works!');

    const token = jwt.sign({id: 1, email: 'ejemplo@email.com'}, secretKey);
    console.log('Token:', token);
});

app.get('/validate', (req, res) => {
    const token = req.query.token;
    jwt.verify(token, secretKey, (err, decode) => {
        if(err){
            res.status(401).send({msg: 'tu token no me sirve'});
        } else {
            res.send(decode);
        }
    })
});

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(client => {
    app.listen(port, () => {
        console.log(`app is running in port ${port}`);
    });
}).catch(err => {
    console.log('No se puede conectar', err);
})