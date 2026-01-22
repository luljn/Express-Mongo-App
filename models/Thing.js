const mongoose = require('mongoose');

// Schéma de données qui contient les champs souhaités pour chaque 'Thing'.
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

// Export du schéma en tant que modèle Mongoose, 
// appelé "Thing".
module.exports(mongoose.model('Thing', thingSchema));