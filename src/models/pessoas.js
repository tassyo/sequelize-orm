"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: "docente_id" });
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        scope: {//scope association;
          status: "confirmado",
          as: "aulasMatriculadas",
        },
      });
    }
  }
  Pessoas.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          validator: (item) => {
            if (item.length < 3)
              throw Error(
                "Dado do tipo Nome deve conter no mínimo 3 caracteres"
              );
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { args: true, message: "Dado do tipo e-mail invalido" },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pessoas",
      paranoid: true,
      defaultScope: {
        where: { ativo: true },
      },
      scope: {
        all: { where: {} },
      },
    }
  );
  return Pessoas;
};
