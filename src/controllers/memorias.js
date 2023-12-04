const { mongo } = require('mongoose');
const fs = require('fs');
const path = require('path');

const Memoria = require('./../models/memoria');
const file = require('./../models/file');

class MemoriasController { // estructura para que puedas hacer varios metodos 

    // Filter memorias by title
    search(req, res) {
        const title = req.params.query;
        Memoria.find({ title: new RegExp(title, 'i') })
            .then(memorias => {
                res.send(memorias);
            })
            .catch(error => {
                console.error('Error al buscar las memorias', error);
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
        // Obtiene los datos de la memoria del cuerpo de la solicitud
        const { user, title, body, hashtag, media } = req.body;
    
        // Crea una nueva instancia de Memoria usando el modelo
        const nuevaMemoria = new Memoria({
            user,
            title,
            body,
            hashtag,
            media
        });
    
        // Guarda la nueva memoria en la base de datos
        nuevaMemoria.save()
            .then(savedMemoria => {
                // Devuelve la memoria recién creada como respuesta
                res.send(savedMemoria);
            })
            .catch(error => {
                console.error('Error al crear una nueva memoria', error);
                res.sendStatus(500);
            });
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