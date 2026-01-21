const express = require('express');
const app = express();

//
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next(); // Pour terminer l'exécution du middleware et passer à l'éxécution du suivant.
});

//
app.use((req, res, next) => {
    res.status(201);
});

//
app.use((req, res, next) => {
    res.json({message: 'Votre requête a bien été reçue !'});
    next();
});

//
app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app;