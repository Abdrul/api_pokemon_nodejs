const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

// const initDb = () => {
//   return sequelize.sync({ force: true }).then((_) => {
//     pokemons.map((pokemon) => {
//       Pokemon.create({
//         name: pokemon.name,
//         hp: pokemon.hp,
//         cp: pokemon.cp,
//         picture: pokemon.picture,
//         types: pokemon.types,
//       });
//     });

//     bcrypt.hash("pikachu", 10).then((hash) => {
//       User.create({ username: "pikachu", password: hash });
//     });
//   });
// };

const initDb = async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (err) {
    console.log(`SALUT JE SUIS L'ERREUR ${err}`);
  }
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
