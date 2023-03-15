const express = require("express");

const database = require("./database/database");
const routes = require("./routes/routes");
const app = express();

database();
app.use(express.json());

app.use(routes);
app.listen(4002, () => console.log("Le serveur tourne sur le port 4002"));