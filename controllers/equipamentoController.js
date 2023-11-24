const Equipamento = require('../models/Equipamento')

const EquipamentoController = {
    salvarEquipamento: async (nome, lab, almox) => {
        try {
            const equipamentoCriado = Equipamento.create({
                nome,
                lab,
                almox
            })
            return equipamentoCriado
        }catch (error) {
            console.error(error)
            throw error
        }
    }
}

module.exports = EquipamentoController