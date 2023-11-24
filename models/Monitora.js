const { DataTypes } = require('sequelize')
const connection = require('../config/database')

const Monitora = connection.define('Monitora', {
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
    tableName: 'monitoras', 
    timestamps: false
})

module.exports = Monitora





