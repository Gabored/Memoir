const Memoria = require('./../models/memoria');

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

}

module.exports = new MemoriasController();