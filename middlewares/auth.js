const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, 'SECRET_KEY');
        const userId = decodedToken.userId;
        req.user = {
            userId: userId
        };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide' });
    }
};

