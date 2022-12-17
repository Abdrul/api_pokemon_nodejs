const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("pokedex", "root", "@Magenta20", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

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
//       }).then((bulbizarre) => console.log(bulbizarre.toJSON()));
//     });

//     bcrypt.hash("pikachu", 10).then((hash) => {
//       User.create({ username: "pikachu", password: hash }).then((user) =>
//         console.log(user.toJSON())
//       );
//     });
//   });
// };

const initDb = async () => {
  await sequelize.sync();
  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types,
    });
    console.log(pokemon);
  });

  const hashing = await bcrypt.hash("pikachu", 10);
  const user = await User.create({ username: "pikachu", password: hashing });
  console.log(user.toJSON());
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
