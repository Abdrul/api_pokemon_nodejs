const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/pokemons/", auth, async (req, res) => {
    try {
      const createPokemon = await Pokemon.create(req.body);
      const message = `Le pokémon ${req.body.name} a bien été crée`;
      res.json({ message, data: createPokemon });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `Le pokémon n'as pu être ajouté. Réessayez dans quelques instants`;
      res.status(500).json({ message, data: error });
    }
  });
};
