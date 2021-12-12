const api = 'http://localhost:3333'
const appUrl = 'http://localhost:3000'
const response = document.getElementById('message')
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/

const page = () => {

    const pagesNotAllowed = [
        `${appUrl}/cadastrar-despesas`,
        `${appUrl}/consultar-despesas`,
        `${appUrl}/configuracoes-usuario`,
        `${appUrl}/verify-email`,
        `${appUrl}/update-email`,
    ]

    if(localStorage.getItem('token') === null && pagesNotAllowed.indexOf(window.location.href) !== -1) 
        window.location.href = '/'

    if(localStorage.getItem('token') !== null && `${appUrl}/` === window.location.href) 
        window.location.href = '/cadastrar-despesas'

    if(`${appUrl}/password-recover` === window.location.href )
        window.location.href = '/'
}

const showModal = (response) => {
    new bootstrap.Modal(document.getElementById('message')).show()
    document.getElementById('response').innerHTML = response
}

const expiryToken = () => {

    if(localStorage.getItem('tokenExpiryTime') !== null && Date.now() > localStorage.getItem('tokenExpiryTime')){
        localStorage.removeItem('tokenExpiryTime')
        localStorage.removeItem('token')
        localStorage.setItem('message', 'Sessão expirada, logue-se novamente')
        window.location.href = '/'
    }
}

const addGIF = (form) => {
    let { button } = form
    button.innerHTML = ''
    const img = document.createElement('img')
    img.src = 'img/loading.gif'
    img.style.width = `${25}px`
    const containerIMG = button
    containerIMG.append(img)
}

const removeGIF = (form, nodeName) => {
    let { button } = form
    button.innerHTML = nodeName
}

if(localStorage.getItem('message') !== null){
    showModal(localStorage.getItem('message'))
    localStorage.removeItem('message')
}

page()

setInterval(expiryToken, 1)