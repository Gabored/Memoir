const jwt = require('jsonwebtoken');
const User = require('./../models/user');

class LoginController {

    login(req, res){
        const { email, password } = req.body;
        console.log('Body ', req.body);
        User.findOne( { email, password })
            .then(response => {
                if(response){
                    const {_id, email } = response;
                    const token = jwt.sign({_id, email}, process.env.SECRET_KEY);
                } else {
                    res.sendStatus(400);
                }
            })
            .catch( err => {
                console.error('Erro no login', err)
                res.sendStatus(400);
            });
    }
    
}

module.exports = new LoginController();