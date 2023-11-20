// Gabriel Olvera, Marian Sedano

// Memoir Project 

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const userRoutes = require('./routes/index'); // Asegúrate de ajustar la ruta correcta

const app = express();
const port = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());

app.use(cors());

// Rutas de usuario
app.use(userRoutes);

// Ruta de prueba
app.get('', (req, res) => {
    res.send('API works!');

    const token = jwt.sign({ id: 1, email: 'ejemplo@email.com' }, secretKey);
    console.log('Token:', token);
});

app.use('/assets', express.static(path.join(__dirname, 'uploads')));

app.get('/validate', (req, res) => {
    const token = req.query.token;
    jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
            res.status(401).send({ msg: 'Tu token no es válido' });
        } else {
            res.send(decode);
        }
    });
});

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`App is running on port ${port}`);
        });
    })
    .catch(err => {
        console.log('Unable to connect to the database', err);
    });
