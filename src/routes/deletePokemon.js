const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, async (req, res) => {
    try {
      const onePokemon = await Pokemon.findByPk(req.params.id);
      if (onePokemon === null) {
        const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant`;
        return res.status(404).json({ message });
      }

      await Pokemon.destroy({ where: { id: onePokemon.id } });
      const message = `Le pokémon avec l'identifiant n°${onePokemon.id} a bien été supprimé.`;
      res.json({ message, data: onePokemon });
    } catch (error) {
      const message = `Le pokémon n'as pas pu être supprimé`;
      res.status(500).json({ message, data: error });
    }
  });
};
