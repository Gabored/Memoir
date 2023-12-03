const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ msg: 'No se proporcionó el token de autenticación' });
    }

    const token = authHeader.split(' ')[1]; // Obtener el token sin el prefijo 'Bearer'

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
