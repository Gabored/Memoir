const Media = require('./../models/media');

class MediasController {

    async ver(req, res) {
        try {
            const media = await Media.findById(req.params.id);
            if (media) {
                const imagePaths = media.title.map(title => `http://localhost:5001/assets/${title}`);
                res.send(imagePaths);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error al obtener el medio:', error);
            res.sendStatus(500);
        }
    }
    

    async listar(req, res) {
        try {
            const medias = await Media.find();
            console.log('Lista de Medios:', medias);
            res.send(medias);
        } catch (error) {
            console.error('Error al obtener la lista de medios:', error);
            res.sendStatus(500);
        }
    }

    async crear(req, res) {
        try {
            const nuevoMedia = new Media(req.body);
            const mediaGuardado = await nuevoMedia.save();
            res.send(mediaGuardado);
        } catch (error) {
            console.error('Error al crear el medio:', error);
            res.sendStatus(500);
        }
    }

    async editar(req, res) {
        try {
            const { id } = req.params;
            const actualizacion = req.body;
            const mediaActualizado = await Media.findByIdAndUpdate(id, actualizacion, { new: true });
            if (mediaActualizado) {
                res.send(mediaActualizado);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error al editar el medio:', error);
            res.sendStatus(500);
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const mediaEliminado = await Media.findByIdAndRemove(id);
            if (mediaEliminado) {
                res.send(mediaEliminado);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            console.error('Error al eliminar el medio:', error);
            res.sendStatus(500);
        }
    }
}

module.exports = new MediasController();
