const User = require('./../models/user');

class UsersController { // estructura para que puedas hacer varios metodos 

    ver(req, res) {
        const id = req.params.id;
        const usuario = ids[id];
        console.log(usuarios[id]);
        if(usuario) {
            res.send(usuario);
        } else { 
            res.sendStatus(404);
        }
    }
    
    listar(req, res) {
        User.find().then(response => {
          console.log('Respuesta: ', response);
          res.send(response);
        }).catch(e =>{
          res.sendStatus(500);
          console.log('Error ',e)
        });
    }

    crear(req, res) {
        res.send(usuarios[0]);
    }

    editar(req, res) {
        res.send(usuarios[0]);
    }

    eliminar(req, res) {
        res.send(usuarios[0]);
    }

}

module.exports = new UsersController();