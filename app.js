const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/Thing');

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

// On intercepte les requêtes 'post' avec ce middleware.
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body // ... -> opérateur 'spread', il va aller copier les champs de req.body et les détailler un par un.
    });
    thing.save() // Enregistre l'objet dans la base.
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({error})); 
});

// On intercepte les requêtes 'get' avec ce middleware.
// 1er argument : url visé par l'application (endpoint).
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;