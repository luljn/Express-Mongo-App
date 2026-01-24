const Thing = require('../models/Thing');

// Pour la création d'un objet.
exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body // ... -> opérateur 'spread', il va aller copier les champs de req.body et les détailler un par un.
    });
    thing.save() // Enregistre l'objet dans la base.
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({error})); 
};

// Pour modifier un objet.
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

// Pour supprimer un objet.
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};

// Pour récupérer un objet.
exports.getThingById = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

// Pour récupérer tous les objets.
exports.getAllThings = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};