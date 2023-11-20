const { mongo } = require('mongoose');
const fs = require('fs');
const path = require('path');

const Memoria = require('./../models/memoria');
const file = require('./../models/file');

class MemoriasController { // estructura para que puedas hacer varios metodos 

    ver(req, res) {
        const id = req.params.id;
        const memoria = ids[id];
        console.log(memorias[id]);
        if(memoria) {
            res.send(memoria);
        } else { 
            res.sendStatus(404);
        }
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

    attachments(req, res){
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