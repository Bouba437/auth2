const {connect} = require("mongoose");

function dbConnexion () {
    connect("mongodb://localhost:27017")
    .then(() => console.log("Connexion base de données réussie"))
    .catch(error => console.log(error));
}

module.exports = dbConnexion