const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const path = require('path')
const { error } = require('console')
const Equipamento = require('./models/Equipamento')
const EquipamentoController = require('./controllers/equipamentoController')
const Monitora = require('./models/Monitora')
const Professor = require('./models/Professor')

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

try {
    Equipamento.sync()
    console.log('Sincronização estabelecida com a tabela "equipamentos"')
  } catch (error) {
    console.error('Erro ao sincronizar a tabela "equipamentos":', error)
  }

try {
    Monitora.sync()
    console.log('Sincronização do model monitora')
}catch (erro ) {
    console.error('Erro:  ',error)
}

try {
    Professor.sync()
    console.log('Sincronização do model monitora')
}catch (erro ) {
    console.error('Erro:  ',error)
}

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    const monitoras = await Monitora.findAll()
    const isMonitora = monitoras.some(monitora => monitora.email === email && monitora.senha === senha);
    const professores = await Professor.findAll()
    const isProfessor = professores.some(professor => professor.email === email && professor.senha === senha);
    
   if (isMonitora) {
    res.redirect('/inventario')
   }else if(isProfessor){
    res.render('telaProfessor')
   }else {
    res.render('index')
   }
   
})

app.get('/inventario', async (req, res) => {
    try {
        const equipamentos = await Equipamento.findAll()
        res.render('inventario', { equipamentos })
    }catch (error) {
        console.error('Ocorreu um erro ao tentar buscar os itens no banco: ', error)
        res.status(500).send('Erro interno do servidor')
    }
})


app.post('/inventario1', async (req, res) => {
    const { nome, lab, almox } = req.body

    try {
        const equipamentoCriado = await Equipamento.create({
            nome: nome,
            quantidade_lab: lab,
            quantidade_almox: almox
        })
        console.log('Equipamento criado:', equipamentoCriado.toJSON())
        res.redirect('/inventario')
    } catch (error) {
        console.error('Erro ao adicionar equipamento:', error)
        res.status(500).send('Erro interno do servidor')
    }
})

app.post('/inventario2', async (req, res) => {
    const jsonContent = req.body

    if (jsonContent && Array.isArray(jsonContent)) {
        try {
            for (const item of jsonContent) {
                const equipamentoId = item.id
                const newEquipamento = {
                    nome: item.nome,
                    quantidade_lab: item.laboratorio,
                    quantidade_almox: item.estoque,
                }

                const [linhasAfetadas] = await Equipamento.update(newEquipamento, {
                    where: { id: equipamentoId },
                })

                if (linhasAfetadas > 0) {
                    console.log(`Equipamento com ID ${equipamentoId} atualizado com sucesso.`)
                } else {
                    console.log(`Equipamento com ID ${equipamentoId} não encontrado.`)
                }
            }

            res.status(200).send('Itens processados com sucesso.')
        } catch (error) {
            console.error('Erro ao processar itens:', error)
            res.status(500).send('Erro interno do servidor.')
        }
    } else {
        res.status(400).send('Formato de dados inválido.')
    }
})


app.listen(port, () => {
    console.log(`Servido rodando em https://localhost:${port}`)
})
