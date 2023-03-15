const express = require("express");
const bcrypt = require("bcrypt");
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
    const {error} = userValidation(body);
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
    res.send("connexion");
}