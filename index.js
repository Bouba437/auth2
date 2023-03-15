const express = require("express");

const routes = require("./routes/routes");

const app = express();

app.use(routes);

app.listen(4002, () => console.log("Le serveur tourne sur le port 4002"));