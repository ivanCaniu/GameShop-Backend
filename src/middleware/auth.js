const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Obtener token del encabezado
    const authHeader = req.headers.authorization;

    // Verificar si no hay token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = auth;
