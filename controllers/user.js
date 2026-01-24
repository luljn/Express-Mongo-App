const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Pour inscrire de nouveaux utilisateurs.
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Pour connecter des utilisateurs exitants.
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}) // On vérifie si l'utilsateur associé au mail fourni existe dans la bdd.
    .then(user => {
        if(user === null){ // Si il n'existe pas : on renvoie une erreur.
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
        }
        else{ // s'il existe.
            bcrypt.compare(req.body.password, user.password) // On compare le mdp entré avec le hash enregistré.
            .then(valid => {
                if(!valid){ // Si le mdp n'est pas valide, on retourne une erreur.
                    res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
                }
                else{
                    res.status(200).json({ // S'il est valide, on renvoie un code 200; avec l'id de l'utilisateur et un token d'auth.
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },  // payload
                            'RANDOM_TOKEN_SECRET', // clé-secrète
                            { expiresIn: '24h' }   // durée de validité
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
};