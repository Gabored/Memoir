const Comment = require('./../models/comment');

class CommentsController {
    ver(req, res) {
        const id = req.params.id;
        Comment.findById(id)
            .then(comment => {
                if (comment) {
                    res.send(comment);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => {
                console.error('Error al obtener el comentario', error);
                res.sendStatus(500);
            });
    }

    listar(req, res) {
        Comment.find()
            .then(comments => {
                res.send(comments);
            })
            .catch(error => {
                console.error('Error al obtener la lista de comentarios', error);
                res.sendStatus(500);
            });
    }

    crear(req, res) {
        const { writer_user, post_id, body, reply } = req.body;

        const newComment = new Comment({
            writer_user,
            post_id,
            body,
            reply
        });

        newComment.save()
            .then(savedComment => {
                res.send(savedComment);
            })
            .catch(error => {
                console.error('Error al crear un nuevo comentario', error);
                res.sendStatus(500);
            });
    }

    editar(req, res) {
        const id = req.params.id;
        const { writer_user, post_id, body, reply } = req.body;

        const updatedComment = {
            writer_user,
            post_id,
            body,
            reply
        };

        Comment.findByIdAndUpdate(id, updatedComment, { new: true })
            .then(updatedComment => {
                if (updatedComment) {
                    res.send(updatedComment);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => {
                console.error('Error al editar el comentario', error);
                res.sendStatus(500);
            });
    }

    eliminar(req, res) {
        const id = req.params.id;
        Comment.findByIdAndRemove(id)
            .then(deletedComment => {
                if (deletedComment) {
                    res.send(deletedComment);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el comentario', error);
                res.sendStatus(500);
            });
    }
}

module.exports = new CommentsController();
