const jwt = require('jsonwebtoken');
const User = require('../models/user');

class LoginController {
    login(req, res) {
        const { username, password } = req.body;
        User.findOne({ username, password })
            .then(response => {
                if (response) {
                    const { _id, username } = response;
                    const token = jwt.sign({ _id, username }, process.env.SECRET_KEY);
                    res.status(200).json({ token });
                } else {
                    res.sendStatus(400);
                }
            })
            .catch(err => {
                console.error('Error en el login', err);
                res.sendStatus(400);
            });
    }
}

module.exports = new LoginController();
