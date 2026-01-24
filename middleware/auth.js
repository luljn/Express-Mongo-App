const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];   // Extraction du token.
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  // Décodage du token.
        const userId = decodedToken.userId;  // Extraction de l'Id utilisateur du token.
        req.auth = {
            userId: userId
        }; // Ajout du token à l'objet request, afin que les routes puissent l'utiliser.
        next();
    }
    catch(error){
        res.status(401).json({ error });
    }
};