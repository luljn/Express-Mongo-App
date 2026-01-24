const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffController = require('../controllers/stuff');

// On intercepte les requêtes 'get' avec ce middleware.
// 1er argument : url visé par l'application (endpoint).
router.get('/', auth, stuffController.getAllThings);

// On intercepte les requêtes 'post' avec ce middleware.
router.post('/', auth, multer, stuffController.createThing); // On n'appelle pas la fontion createThing,
                                               // On l'applique à la route,
                                               // On ajoute le middleware d'authentification avant le gestionnaire de routes.

// On intercepte les requêtes get pour un objet en particulier.
// Le ':' spécifie que la partie de la route le contenant est dynamique.
router.get('/:id', auth, stuffController.getThingById);

//On intercepte les requêtes 'put' pour un objet en particulier.
router.put('/:id', auth, multer, stuffController.modifyThing);

//On intercepte les requêtes 'delete' pour un objet en particulier.
router.delete('/:id', auth, stuffController.deleteThing);

module.exports = router;