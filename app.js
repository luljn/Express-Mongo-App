const express = require('express');
const app = express();

// 1er argument : url visé par l'application (endpoint).
app.use('/api/stuff', (req, res, next) => {
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