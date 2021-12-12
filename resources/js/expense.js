const registerExpense = async () => {

    let expenseName = document.getElementById('expenseName')
    let dueDate = document.getElementById('dueDate')
    let price = document.getElementById('price')

    if (!expenseName.value || !dueDate.value || !price.value) {
        return showModal("Preencha todos os campos")
    }

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            expenseName: expenseName.value,
            dueDate: dueDate.value,
            price: price.value
        })
    }

    const requestResponse = await fetch(`${api}/expenses`, options)
    const responseJSON = await requestResponse.json()

    expenseName.value = ''
    dueDate.value = ''
    price.value = ''

    showModal(responseJSON.response)
}

const readExpenses = (responseJSON) => {

    const expenses = document.getElementById('expenses')
    expenses.innerHTML = ''

    for (let i = 0; i < responseJSON.response.length; i++) {

        const row = document.createElement('tr')

        const name = document.createElement('td')
        name.innerHTML = responseJSON.response[i].expenseName

        const dueDate = document.createElement('td')
        dueDate.innerHTML = new Date(responseJSON.response[i].dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })

        const price = document.createElement('td')
        price.innerHTML = 'R$ ' + responseJSON.response[i].price

        const btnUpdateRow = document.createElement('td')
        const btnUpdate = document.createElement('button')
        btnUpdate.innerHTML = 'Atualizar'
        btnUpdate.className = 'btn-sm btn-success'
        btnUpdate.onclick = () => {

            const expenseName = document.createElement('input')
            expenseName.type = 'text'
            expenseName.className = 'form-control mb-3'
            expenseName.value = responseJSON.response[i].expenseName
            expenseName.id = 'expenseName'

            const dueDate = document.createElement('input')
            dueDate.type = 'date'
            dueDate.className = 'form-control mb-3'
            dueDate.value = new Date(responseJSON.response[i].dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            dueDate.id = 'dueDate'

            const price = document.createElement('input')
            price.type = 'number'
            price.className = 'form-control mb-3'
            price.value = responseJSON.response[i].price
            price.id = 'price'

            const idExpense = document.createElement('input')
            idExpense.type = 'hidden'
            idExpense.value = responseJSON.response[i]._id
            idExpense.id = 'idExpense'

            const container = document.getElementById('container')
            container.innerHTML = ''

            container.append(expenseName)
            container.append(dueDate)
            container.append(price)
            container.append(idExpense)

            new bootstrap.Modal(document.getElementById('updateExpense')).show()

        }

        const btnDeleteRow = document.createElement('td')
        const btndelete = document.createElement('button')
        btndelete.innerHTML = 'Pagar'
        btndelete.className = 'btn-sm btn-danger'
        btndelete.onclick = async () => {

            const idExpense = document.getElementById(`idExpense${i}`).value

            const options = {
                method: 'DELETE',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            const requestResponse = await fetch(`${api}/expenses/delete/${idExpense}`, options)
            const responseJSON = await requestResponse.json()

            getExpenses()
        }

        const idExpense = document.createElement('input')
        idExpense.type = 'hidden'
        idExpense.value = responseJSON.response[i]._id
        idExpense.id = `idExpense${i}`

        row.append(name)
        row.append(dueDate)
        row.append(price)
        row.append(btnUpdateRow)
        row.append(btnDeleteRow)
        row.append(idExpense)
        btnUpdateRow.append(btnUpdate)
        btnDeleteRow.append(btndelete)

        document.getElementById('loading').innerHTML = ''

        expenses.append(row)
    }
}

const getTotalPayAndExpense = async (responseJSON) => {

    let prices = Array()

    responseJSON.response.map((price) => {
        prices.push(price.price)
    })

    const totalPrice = prices.reduce((total, currentElement) => total + currentElement)

    document.getElementById('totalExpenses').innerHTML = responseJSON.response.length
    document.getElementById('totalPay').innerHTML = 'R$ ' + totalPrice
}

const getExpenses = async () => {

    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const requestResponse = await fetch(`${api}/expenses`, options)
    const responseJSON = await requestResponse.json()

    if(responseJSON.response.length === 0){
        document.getElementById('loading').innerHTML = ''
        document.getElementById('totalExpenses').innerHTML = 0
        document.getElementById('totalPay').innerHTML = 'R$ ' + 0
    }

    getTotalPayAndExpense(responseJSON)
    readExpenses(responseJSON)

}

const updateExpense = async () => {

    let idExpense = document.getElementById('idExpense')
    let expenseName = document.getElementById('expenseName')
    let dueDate = document.getElementById('dueDate')
    let price = document.getElementById('price')

    if (!expenseName.value || !dueDate.value || !price.value) {
        return showModal('Preencha todos os campos')
    }

    const options = {
        method: 'PUT',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            expenseName: expenseName.value,
            dueDate: dueDate.value,
            price: price.value
        })
    }

    await fetch(`${api}/expenses/update/${idExpense.value}`, options)

    getExpenses()

}

const expenseSearch = async () => {

    const expenseSearch = document.getElementById('expenseSearch')

    if (!expenseSearch.value) {
        return showModal('Preencha o campo de pesquisa')
    }

    const expenses = document.getElementById('expenses')
    expenses.innerHTML = ''

    const img = document.createElement('img')
    img.src = 'img/loading.gif'
    const containerIMG = document.getElementById('loading')
    containerIMG.append(img)

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            expenseSearch: expenseSearch.value
        })
    }

    const requestResponse = await fetch(`${api}/expenses/expenses-search`, options)
    const responseJSON = await requestResponse.json()

    if (responseJSON.response.length === 0) {
        containerIMG.innerHTML = ''
        expenseSearch.value = ''
        getExpenses()
        showModal('Não existem despesas com esse nome')
    }

    document.getElementById('expenseSearch').value = ''

    getTotalPayAndExpense(responseJSON)
    readExpenses(responseJSON)

}

if (window.location.href.indexOf('/consultar-despesas') !== -1) getExpenses()