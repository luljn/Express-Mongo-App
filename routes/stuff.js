const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuff');

// On intercepte les requêtes 'post' avec ce middleware.
router.post('/', stuffController.createThing); // On n'appelle pas la fontion createThing,
                                               // On l'applique à la route.

//On intercepte les requêtes 'put' pour un objet en particulier.
router.put('/:id', stuffController.modifyThing);

//On intercepte les requêtes 'delete' pour un objet en particulier.
router.delete('/:id', stuffController.deleteThing);

// On intercepte les requêtes get pour un objet en particulier.
// Le ':' spécifie que la partie de la route le contenant est dynamique.
router.get('/:id', stuffController.getThingById);

// On intercepte les requêtes 'get' avec ce middleware.
// 1er argument : url visé par l'application (endpoint).
router.get('/', stuffController.getAllThings);

module.exports = router;