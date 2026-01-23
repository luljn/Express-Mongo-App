const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/Test')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Intercepte toutes les requêtes qui ont un content-type application/json,
// et met à disposition ce contenu sur l'objet requête dans 'req.body' .
app.use(express.json());

// Middleware pour résoudre les érreurs de CORS.
// Middleware général(sera appliqué à toutes les requêtes envoyées au serveur).
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet d'accéder à l'API depuis n'importe qu'elle origine. 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajoute les headers mentionnés aux requêtes envoyées vers l'API.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Permet d'envoyer des requêtes avec les méthodes mentionnées.
    next();
});

// Utilisation des routes 'stuff'.
app.use('/api/stuff', stuffRoutes);

module.exports = app;