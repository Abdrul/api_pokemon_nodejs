const { Pokemon } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons/:id", auth, async (req, res) => {
    try {
      const onePokemon = await Pokemon.findByPk(req.params.id);
      if (onePokemon === null) {
        const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant`;
        return res.status(404).json({ message });
      }
      const message = `Un pokémon a bien été récupérée`;
      res.json({ message, data: onePokemon });
    } catch (error) {
      const message = `Le pokémon demandé n'existe pas. Réessayez dans quelques instants`;
      res.status(500).json({ message, data: error });
    }
  });
};
