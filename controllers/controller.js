const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/model");
const userValidation = require("../validation/validation");

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.inscription = (req, res) => {
    // ** Récupérer les données
    const {body} = req;
    // ** Valider les données
    const {error} = userValidation(body).userValidationSignUp;
    if(error) return res.status(401).json(error.details[0].message)

    // hash du mdp
    bcrypt.hash(body.password, 10)
    .then(hash => {
        if(!hash) return res.status(500).json({msg: "Server error"});

        delete body.password;
        new User({...body, password: hash})
        .save()
        .then((user) => {
            console.log(user)
            res.status(201).json({msg: "User created"})
        })
        .catch((error) => res.status(500).json(error))
    })
    .catch((error) => res.status(500).json(error))
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.connexion = (req, res) => {
    const {email, password} = req.body;
    // ** validation des données
    const {error} = userValidation(req.body).userValidationLogin
    if(error) return res.status(401).json(error.details[0].message)

    // ** trouver le user dans la base de données
    User.findOne({email: email})
    .then(user => {
        if(!user) return res.status(404).json({msg: "User not found"})
        // vérification du mdp
        bcrypt.compare(password, user.password)
        .then(match => {
            if(!match) return res.status(500).json({msg: "Server error"})
            // ** envoyer un token d'autentification au cas où ça marche
            res.status(200).json({
                email: user.email,
                id: user._id,
                token: jwt.sign({id: user._id}, "SECRET_KEY", {expiresIn: "12h"})
            })
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error))
}