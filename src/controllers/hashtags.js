const Hashtag = require('./../models/hashtag');

class HashtagsController {

    // Filter hashtags by name
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

    // List all hashtags
    listar(req, res) {
        Hashtag.find()
            .then(response => {
                console.log('Respuesta: ', response);
                res.send(response);
            })
            .catch(error => {
                console.error('Error al obtener la lista de hastags', error);
                res.sendStatus(500);
            });
    }

    // Create a new hashtag
    crear(req, res) {
        const nuevoHashtag = new Hashtag(req.body);
        nuevoHashtag.save()
            .then(() => {
                res.send({ message: 'Hashtag creado exitosamente' });
            })
            .catch(error => {
                console.error('Error al crear el hashtag', error);
                res.sendStatus(500);
            });
    }

    // Edit a hashtag by its name
    editar(req, res) {
        const nombre = req.params.nombre;
        Hashtag.findOneAndUpdate({ nombre: nombre }, req.body)
            .then(() => {
                res.send({ message: 'Hashtag editado exitosamente' });
            })
            .catch(error => {
                console.error('Error al editar el hashtag', error);
                res.sendStatus(500);
            });
    }

    // Delete a hashtag by its name
    eliminar(req, res) {
        const nombre = req.params.nombre;
        Hashtag.findOneAndDelete({ nombre: nombre })
            .then(() => {
                res.send({ message: 'Hashtag eliminado exitosamente' });
            })
            .catch(error => {
                console.error('Error al eliminar el hashtag', error);
                res.sendStatus(500);
            });
    }
}

module.exports = new HashtagsController();
