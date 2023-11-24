const Sequelize = require('sequelize')

// Conectando o sequelize com o banco de dados
module.exports = new Sequelize('controle_de_estoque_enfermagem_teste', 'root', '159159', 
{
    host: 'localhost',
    dialect: 'mysql'
})