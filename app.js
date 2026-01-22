const express = require('express');
const app = express();

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
    console.log(req.body);
    // Code 201 -> création de ressource.
    res.status(201).json({
        message: 'Objet crée !'
    });
});

// On intercepte les requêtes 'get' avec ce middleware.
// 1er argument : url visé par l'application (endpoint).
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900, // en centimes.
            userId: 'qsomihvqios', 
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900, // en centimes.
            userId: 'qsomihvqios', 
        },
    ];
    res.status(200).json(stuff);
});

module.exports = app;