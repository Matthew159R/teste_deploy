// models/Equipamento.js
const { DataTypes, INTEGER } = require('sequelize')
const connection = require('../config/database')


const Equipamento = connection.define('Equipamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidade_lab: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade_almox: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'equipamentos', 
    timestamps: false
});

module.exports = Equipamento
