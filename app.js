const express = require('express');
const app = express();

// Middleware 1 : enregistre "Requête reçue" dans la console.
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next(); // Pour terminer l'exécution du middleware et passer à l'éxécution du suivant.
});

// Middleware 2 : ajoute un code d'état 201 à la réponse.
app.use((req, res, next) => {
    res.status(201);
    next();
});

// Middleware 3 : envoie la réponse JSON.
app.use((req, res, next) => {
    res.json({message: 'Votre requête a bien été reçue !'});
    next();
});

// Middleware 4 : enregiste "Réponse envoyée avec succès !" dans la console.
app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app;