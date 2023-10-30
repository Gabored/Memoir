const Hashtag = require('./../models/hashtag');

class HashtagsController { // estructura para que puedas hacer varios metodos 

    ver(req, res) {
        const id = req.params.id;
        const hashtag = ids[id];
        console.log(hashtags[id]);
        if(hashtag) {
            res.send(hashtag);
        } else { 
            res.sendStatus(404);
        }
    }
    
    listar(req, res) {
        Hashtag.find().then(response => {
          console.log('Respuesta: ', response);
          res.send(response);
        }).catch(e =>{
          res.sendStatus(500);
          console.log('Error ',e)
        });
    }

    crear(req, res) {
        res.send(hashtags[0]);
    }

    editar(req, res) {
        res.send(hashtags[0]);
    }

    eliminar(req, res) {
        res.send(hashtags[0]);
    }

}

module.exports = new HashtagsController();