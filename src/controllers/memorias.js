const { mongo } = require('mongoose');
const fs = require('fs');
const path = require('path');

const Memoria = require('./../models/memoria');
const file = require('./../models/file');

class MemoriasController { // estructura para que puedas hacer varios metodos 

    // Filter memorias by name
    search(req, res) {
        const name = req.params.name;
        Hashtag.find({ name: new RegExp(name, 'i') })
            .then(hashtags => {
                res.send(hashtags);
            })
            .catch(error => {
                console.error('Error al buscar los hashtags', error);
                res.sendStatus(500);
            });
    }
    
    listar(req, res) {
        Memoria.find().then(response => {
          console.log('Respuesta: ', response);
          res.send(response);
        }).catch(e =>{
          res.sendStatus(500);
          console.log('Error ',e)
        });
    }

    crear(req, res) {
        res.send(memorias[0]);
    }

    editar(req, res) {
        res.send(memorias[0]);
    }

    eliminar(req, res) {
        res.send(memorias[0]);
    }

    upload(req, res) {
        if(!req.file){
            res.status(400).send({ message: 'File not supported '});
        }

        file.create({
            name: req.file.originalname,
            filename: req.file.filename,
            todoId: req.params.id
        }).then(response => {
            res.send(response);
        }).catch(err => {
            const uri = path.join(__dirname, '..', '..', 'uploads', req.file.filename);
            fs.unlinkSync(uri);
            res.status(400).send(err);
        });
    }

    medias(req, res){
        file.find({
            todoId: req.params.id
        }).then(response => {
            res.send(response);
        }).catch(() => {
            res.status(400).send();
        })
    }
}

module.exports = new MemoriasController();