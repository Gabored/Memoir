const Media = require('./../models/media');

class MediasController { // estructura para que puedas hacer varios metodos 

    ver(req, res) {
        const id = req.params.id;
        const media = ids[id];
        console.log(medias[id]);
        if(media) {
            res.send(media);
        } else { 
            res.sendStatus(404);
        }
    }
    
    listar(req, res) {
        Media.find().then(response => {
          console.log('Respuesta: ', response);
          res.send(response);
        }).catch(e =>{
          res.sendStatus(500);
          console.log('Error ',e)
        });
    }

    crear(req, res) {
        res.send(medias[0]);
    }

    editar(req, res) {
        res.send(medias[0]);
    }

    eliminar(req, res) {
        res.send(medias[0]);
    }

}

module.exports = new MediasController();