const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/pokemons/:id", auth, async (req, res) => {
    const id = req.params.id;
    try {
      await Pokemon.update(req.body, {
        where: { id: id },
      });

      const onePokemon = await Pokemon.findByPk(id);

      if (onePokemon === null) {
        const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant`;
        return res.status(404).json({ message });
      }
      const message = `Le pokémon ${onePokemon.name} a bien été modifié.`;
      res.json({ message, data: onePokemon });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = `Le pokémon n'as pas pu être modifié`;
      res.status(500).json({ message, data: error });
    }
  });
};
