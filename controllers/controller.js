const express = require("express");
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
    console.log(body);
    res.json(body);
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.connexion = (req, res) => {
    res.send("connexion");
}