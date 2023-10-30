const Comment = require('./../models/comment');

class CommentsController { // estructura para que puedas hacer varios metodos 

    ver(req, res) {
        const id = req.params.id;
        const comment = ids[id];
        console.log(comments[id]);
        if(comment) {
            res.send(comment);
        } else { 
            res.sendStatus(404);
        }
    }
    
    listar(req, res) {
        Comment.find().then(response => {
          console.log('Respuesta: ', response);
          res.send(response);
        }).catch(e =>{
          res.sendStatus(500);
          console.log('Error ',e)
        });
    }

    crear(req, res) {
        res.send(comments[0]);
    }

    editar(req, res) {
        res.send(comments[0]);
    }

    eliminar(req, res) {
        res.send(comments[0]);
    }

}

module.exports = new CommentsController();