const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/pokemons", auth, async (req, res) => {
    try {
      if (req.query.name) {
        const name = req.query.name;
        const limit = parseInt(req.query.limit) || 5;

        if (name.length < 2) {
          const message = `Le terme de recherche doit contenir au moins 2 caractères`;
          return res.status(400).json({ message });
        }

        const { count, rows } = await Pokemon.findAndCountAll({
          where: { name: { [Op.like]: `%${name}%` } },
          limit: limit,
        });

        const message = `Il y a ${count} qui correspond au terme de recherce ${name}`;
        return res.json({ message, data: rows });
      }

      const AllPokemon = await Pokemon.findAll();
      const message = `La liste des pokémons a bien été récupérée`;
      res.json({ message, data: AllPokemon });
    } catch (error) {
      const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelque instants`;
      res.status(500).json({ message, data: error });
    }
  });
};
