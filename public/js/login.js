/*
const formulario = document.querySelector('form')

const login = function (email, senha) {
    // Essa parte mais a frente irá ser feita no back-end
    // A validação será feita no back-end e a reposta enviada para o front-end
        
    // Arrays de objetos que simulam as tabelas 
    const emails_e_senhas_professores = [
        {
            email: 'tiago@gmail.com',
            senha: 'tiaguinhoDosCorre3?!'
        },
        {
            email: 'wagner@gmail.com',
            senha: 'wagnerNãoViuNada159'
        },
        {
            email: 'Ana@gmail.com',
            senha: 'BeboTodas$123'
        },
        {
            email: 'professorTeste@gmail.com',
            senha: 'teste'
        }
    ]

    const emails_e_senhas_monitoras = [
        {
            email: 'renata@gmail.com',
            senha: 'renataNãoToNemAí85'
        },
        {
            email: 'Manu@gmail.com',
            senha: 'manuDosAnime147'
        },
        {
            email: 'novaMonitora@gmail.com',
            senha: 'NãoSeiONomeDela123'
        },
        {
            email: 'monitoraTeste@gmail.com',
            senha: 'teste'
        }
    ]

    // 0 significa professor e monitora é 1

    let login = 2

    for(let i = 0; i < emails_e_senhas_professores.length; i++) 
    {
        if (emails_e_senhas_professores[i].email === email && emails_e_senhas_professores[i].senha === senha)
        {
            login = 0

        }else if (emails_e_senhas_monitoras[i].email === email && emails_e_senhas_monitoras[i].senha === senha)
        {
            login = 1
        }
    }

    
}

formulario.addEventListener('submit', event => {
    event.preventDefault()

    const valorDoInputEmail = event.target.email.value
    const valorDoInputDeSenha = event.target.senha.value

    login(valorDoInputEmail, valorDoInputDeSenha)

})

*/