const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const PORT = process.env.PORT || 3000;

// morgan middleware
app.use(bodyParser.json());

sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello Heroku");
});

require("./src/routes/findAllPokemon")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL";
  res.status(404).json({ message });
});

app.listen(PORT, () => console.log("Node démarré sur le port" + PORT));
