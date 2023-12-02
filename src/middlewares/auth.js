const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ msg: 'No se proporcionó el token de autenticación' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ msg: 'Token de autenticación inválido' });
        } else {
            req.user = decoded;
            next();
        }
    });
};

module.exports = authMiddleware;