const User = require('./../models/user');

class UsersController {

    // Obtiene un usuario por su ID
    ver(req, res) {
        const id = req.params.id;
        // Utiliza el método findById de Mongoose
        User.findById(id)
            .then(usuario => {
                if (usuario) {
                    res.send(usuario);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => {
                console.error('Error al obtener el usuario', error);
                res.sendStatus(500);
            });
    }

    // Listar todos los usuarios
    listar(req, res) {
        console.log('Usuario', req.user);
        // Utiliza el método find de Mongoose para obtener todos los usuarios
        User.find()
            .then(response => {
                console.log('Respuesta: ', response);
                res.send(response);
            })
            .catch(error => {
                console.error('Error al obtener la lista de usuarios', error);
                res.sendStatus(500);
            });
    }

    // Crear un nuevo usuario
    crear(req, res) {
        // Obtiene los datos del usuario del cuerpo de la solicitud
        const { name, surname, username, password, email, location, interests, role } = req.body;

        // Crea una nueva instancia de User usando el modelo
        const newUser = new User({
            name,
            surname,
            username,
            password,
            email,
            location,
            interests,
            role
        });

        // Guarda el nuevo usuario en la base de datos
        newUser.save()
            .then(savedUser => {
                // Devuelve el usuario recién creado como respuesta
                res.send(savedUser);
            })
            .catch(error => {
                console.error('Error al crear un nuevo usuario', error);
                res.sendStatus(500);
            });
    }

    // Editar un usuario existente
    editar(req, res) {
        const id = req.params.id;
        // Obtiene los datos del usuario actualizados del cuerpo de la solicitud
        const { name, surname, username, password, email, location, interests, role } = req.body;

        // Método findByIdAndUpdate de Mongoose para actualizar el usuario
        User.findByIdAndUpdate(id, {
            name,
            surname,
            username,
            password,
            email,
            location,
            interests,
            role
        }, { new: true }) // La opción { new: true } devuelve el documento actualizado
            .then(updatedUser => {
                if (updatedUser) {
                    res.send(updatedUser);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => {
                console.error('Error al editar el usuario', error);
                res.sendStatus(500);
            });
    }

    // Eliminar un usuario
    eliminar(req, res) {
        const id = req.params.id;
        // Utiliza el método findByIdAndRemove de Mongoose para eliminar el usuario
        User.findByIdAndRemove(id)
            .then(deletedUser => {
                if (deletedUser) {
                    res.send(deletedUser);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el usuario', error);
                res.sendStatus(500);
            });
    }
}

module.exports = new UsersController();
