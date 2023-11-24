const { DataTypes } = require('sequelize')
const connection = require('../config/database')

const Professor = connection.define('Professor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'professores', 
    timestamps: false
})

module.exports = Professor