const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    try {
      const user = await User.findOne({
        where: { username: req.body.username },
      });

      if (!user) {
        const message = `L'utilisateur demandé n'existe pas`;
        return res.status(404).json({ message });
      }

      const compare = await bcrypt.compare(req.body.password, user.password);

      if (!compare) {
        const message = `Le mot de passe est incorrect`;
        return res.status(401).json({ message });
      }

      const token = jwt.sign({ userId: user.id }, privateKey, {
        expiresIn: "24h",
      });

      const message = `L'utilisateur a été connecté avec succès`;
      return res.json({ message, data: user, token });
    } catch (error) {
      const message = `L'utilisateur n'a pas pu être connecté.Reéssayez dans quelques instants.`;
      return res.json({ message, data: error });
    }
  });
};
