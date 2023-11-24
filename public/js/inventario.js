function searchItem () 
{
    const searchInput = document.querySelector('.pesquisar').querySelector('input')
    const itens = document.querySelector('.itens').querySelectorAll('form')

    searchInput.addEventListener('input', event => 
    {
        const inputValue = event.target.value.toUpperCase()
        itens.forEach(item => 
        {
            const itemNameValue = item.querySelector('#nome').value
            const equals = itemNameValue.toUpperCase().includes(inputValue)

            if (equals) {
                item.style.display = 'flex'
            }else {
                item.style.display = 'none'
            }
        })
    })
}

searchItem()

function addItemDatabase () 
{
    const addButton = document.querySelector('.adicionar')
    const popup = document.querySelector('.popup')
    const wrapper = document.querySelector('.wrapper')
    const formPopup = popup.querySelector('form')
    const itens = document.querySelector('.itens')

    formPopup.addEventListener('submit', event => 
    {
        event.preventDefault()
        const inputNameForm = event.target.nome.value
        const inputCountLab = event.target.quantidadeLab.value
        const inputCountInventory = event.target.quantidadeEstoque.value


        if (!inputNameForm || !inputCountLab || !inputCountInventory) 
        {
            alert('Preencha todos os campos')
        }else 
        {
            const object = {
                nome: inputNameForm,
                lab: inputCountLab,
                almox: inputCountInventory
            }

            fetch('http://localhost:3000/inventario1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na solicitação. Status: ' + response.status)
                }
                return response.json()
            })
            .then(data => {
                console.log('Resposta do servidor:', data)
            })
            .catch(error => {
                console.error(error.message)
            })

            const form = document.createElement('form')

            form.innerHTML = 
            `<form>
                <input type="text" value="${inputNameForm}" id="nome">
                <input type="number" value="${inputCountLab}" id="laboratorio">
                <input type="number" value="${inputCountInventory}" id="estoque">
                <button type="submit"></button>
            </form>`

            popup.classList.add('d-none')
            wrapper.classList.add('d-none')
            popup.classList.remove('animation-popup')
    
            itens.appendChild(form)
            inputNameForm.value = ''
            inputCountLab.value = ''
            inputCountInventory.value = ''
        }
    })

    // Fechando o popup sem enviar
    addButton.addEventListener('click', event => 
    {
        popup.classList.remove('d-none')
        wrapper.classList.remove('d-none')
        popup.classList.add('animation-popup')
    })
    
    popup.addEventListener('click', event => 
    {
        const clickedElement = event.target
        if (clickedElement.classList.contains('popup')) 
        {
            popup.classList.add('d-none')
            wrapper.classList.add('d-none')
            popup.classList.remove('animation-popup')
        }            
    })
}

addItemDatabase()

function updateItemDatabase () 
{
    const itensElement = document.querySelector('.itens')
    const itens = Array.from(itensElement.children)
    
    const itensArray = []
    itens.forEach(item => 
    {
        const itemObject = 
        {
            nome: item[0].value,
            lab: item[1].value,
            inventory: item[2].value
        }   
        itensArray.push(itemObject)     
    })
    let modify = false
    const itensModify = []

    document.querySelector('.update').addEventListener('click', () => 
    {        
        for(i = 0; i < itens.length; i++) 
        {
           if (itens[i].nome.value != itensArray[i].nome || itens[i].laboratorio.value != itensArray[i].lab || itens[i].estoque.value != itensArray[i].inventory) 
           {
            modify = true
            const jsonContent = {
                id: itens[i].id,
                nome: itens[i].nome.value,
                lab: itens[i].laboratorio.value,
                almox: itens[i].estoque.value
            }

            itensModify.push(jsonContent)
           }
        }
        console.log(itensModify)
        if (modify) 
        {    
            fetch('http://localhost:3000/inventario2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itensModify)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na solicitação. Status: ' + response.status)
                }
                return response.json()
            })
            .then(data => {
                console.log('Resposta do servidor:', data)
            })
            .catch(error => {
                console.error(error.message);
            })
        }
    })
}
updateItemDatabase()
