const Reaction = require('./../models/reaction');

class ReactionsController { // estructura para que puedas hacer varios metodos 

    ver(req, res) {
        const id = req.params.id;
        const reaction = ids[id];
        console.log(reactions[id]);
        if(reaction) {
            res.send(reaction);
        } else { 
            res.sendStatus(404);
        }
    }
    
    listar(req, res) {
        Reaction.find().then(response => {
          console.log('Respuesta: ', response);
          res.send(response);
        }).catch(e =>{
          res.sendStatus(500);
          console.log('Error ',e)
        });
    }

    crear(req, res) {
        res.send(reactions[0]);
    }

    editar(req, res) {
        res.send(reactions[0]);
    }

    eliminar(req, res) {
        res.send(reactions[0]);
    }

}

module.exports = new ReactionsController();