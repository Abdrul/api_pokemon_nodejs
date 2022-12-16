const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris.",
        },
        validate: {
          notEmpty: {
            msg: "Ne laissez pas de caractere vide",
          },
          notNull: { msg: "Le nom est requis" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie",
          },
          notNull: { msg: "Les points de vie sont requise" },
          min: {
            args: [0],
            msg: "Les hp ne peuvent pas être en dessous de 0",
          },
          max: {
            args: [999],
            msg: "Les hp ne peuvent pas dépasser 1000",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points d'attaque",
          },
          notNull: { msg: "Les points d'attaque sont requise" },
        },
        min: {
          args: [0],
          msg: "Les hp ne peuvent pas être en dessous de 0",
        },
        max: {
          args: [99],
          msg: "Les hp ne peuvent pas dépasser 1000",
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utilisez une URL pour l'image",
          },
          notNull: { msg: "L'image est requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value)
              throw new Error("Un pokémon doit au moins avoir un type");
            if (value.split(",").length > 3)
              throw new Error(
                "Un pokémon ne peux pas avoir plus de trois types"
              );
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste suivante ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
