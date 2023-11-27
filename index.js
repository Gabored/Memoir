// Gabriel Olvera, Marian Sedano

// Memoir Project 

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const $ = require('jquery');

require('dotenv').config();

const userRoutes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());

app.use(cors());

// Rutas de usuario
app.use(userRoutes);

app.use('/assets', express.static(path.join(__dirname, 'media')));

// PRUEBA
app.get('', (req, res) => {
    const uri = path.join(__dirname, 'front', 'index.html');
    res.sendFile(uri);
})

app.get('*', (req, res) => {
    const uri = path.join(__dirname, 'front', 'error.html');
    res.sendFile(uri)
})

// Ruta de prueba
/* app.get('', (req, res) => {
    res.send('API works!');

    const token = jwt.sign({ id: 1, email: 'ejemplo@email.com' }, secretKey);
    console.log('Token:', token);
}); */

// app.use('/assets', express.static(path.join(__dirname, 'uploads')));

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

// Subir memoria
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ts = new Date().getTime();
        const ext = file.originalname.split('.').pop();
        const name = `${ts}.${ext}`;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const isValid = file.mimetype.startsWith('image/');
    cb(null, isValid);
}

const uploadMiddleware = multer({storage, fileFilter});

app.post('/upload', uploadMiddleware.single('foto'), (req, res) => {
    console.log('File:', req.file);
    if(req.file){
        //console.log('body: ', req.body);
        res.send('OK!');
    } else{
        res.status(400).send('invalid format');
    }
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

// Crear usuario
/* function fetchUsers() {
    $.ajax({
        url: 'http://localhost:5001/users',
        method: 'POST',
        dataType: 'json',
        success: function (users) {
            const userListDiv = $('#userList');
            userListDiv.empty();

            $.each(users, function (index, user) {
                const userDiv = $('<div>');                 
                userDiv.html(`                     
                    <p>Name: ${user.name}</p>                     
                    <p>Email: ${user.email}</p> 
                    <hr> 
                    `);                 
                    userListDiv.append(userDiv);             
                });         
            },         
            error: function (error) {             
                console.error('Error fetching users:', error);         
            }     
        }); 
    } 
    
    // Call the fetchUsers function when the document is ready or as needed
    //$(document).ready(function () {     
    //    fetchUsers(); 
    //}); */