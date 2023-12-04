// Gabriel Olvera, Marian Sedano

// Memoir Project 

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//const $ = require('jquery');

require('dotenv').config();

const userRoutes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY;

app.use(bodyParser.json());

app.use(cors());

// Rutas de usuario
app.use('', userRoutes);

app.use('/assets', express.static(path.join(__dirname, 'uploads')));

// PRUEBA
app.get('', (req, res) => {
    const uri = path.join(__dirname, 'front', 'signup.html');
    res.sendFile(uri);
})

app.get('/crear-memoria', (req, res) => {
    const uri = path.join(__dirname, 'front', 'crear-memoria.html');
    res.sendFile(uri);
})

// Ruta de prueba
/* app.get('', (req, res) => {
    res.send('API works!');

    const token = jwt.sign({ id: 1, email: 'ejemplo@email.com' }, secretKey);
    console.log('Token:', token);
}); */


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
const Attachment = require('./src/models/media');

let uploadCount = 0;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ts = new Date().getTime();
        const ext = file.originalname.split('.').pop();
        const name = `${ts}-${uploadCount++}.${ext}`;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image', 'audio', 'video'];

    // Verificar si el tipo de archivo está permitido
    const fileType = file.mimetype.split('/')[0];
    if (allowedTypes.includes(fileType)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no admitido'));
    }
};

const uploadMiddleware = multer({storage, fileFilter});

app.post('/upload', uploadMiddleware.array('foto'), async (req, res) => {
    console.log('Files:', req.files);
    if(req.files && req.files.length > 0){
        const attachment = new Attachment({
            title: req.files.map(file => file.filename),
        });

        try {
            await attachment.save();
            console.log('Archivos guardados en la base de datos');
        } catch (error) {
            console.error('Error al guardar los archivos en la base de datos:', error);
        }

        res.send('OK!');
    } else{
        res.status(400).send('invalid format');
    }

    uploadCount = 0;
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

app.get('*', (req, res) => {
    const uri = path.join(__dirname, 'front', 'error.html');
    res.sendFile(uri)
}) 