const registerUser = async () => {

    const form = document.forms.register

    const { email, password, passwordConfirm, button } = form

    addGIF(button);

    if(!email.value || !password.value || !passwordConfirm.value){
        return showModal('Preencha todos os campos')
    }

    if(!passwordRules.test(password.value)) {
        return showModal('Sua senha precisar ter 8 caracteres, uma letra maiúscula, uma minúscula e um número')
    }

    if(password.value !== passwordConfirm.value) {
        return showModal('As senhas não coincidem')
    }

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        })
    }

    const requestResponse = await fetch(`${api}/user/create`, options)
    const responseJSON = await requestResponse.json()

    email.value = ''
    password.value = ''
    passwordConfirm.value = ''

    removeGIF(button, "Cadastrar");

    showModal(responseJSON.response)

}

const verifyEmail = async () => {

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
    }

    const requestResponse = await fetch(`${api}/verify-email${location.search}`, options)
    const responseJSON = await requestResponse.json()

    localStorage.setItem('message', responseJSON.response)
    
    if(window.location.href.indexOf('/verify-email') !== -1) window.location.href = '/'

    if(window.location.href.indexOf('/verify-email-update') !== -1) window.location.href = '/'
}

const loginUser = async () => {

    const form = document.forms.login

    let { email, password, button } = form

    if(!email.value || !password.value){
        return showModal('Preencha todos os campos')
    }

    if(!passwordRules.test(password.value)) {
        return showModal('Email/Senha Incorreto(s)')
    }

    addGIF(button);

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    }

    const requestResponse = await fetch(`${api}/user/login`,options)
    const responseJSON = await requestResponse.json()

    if(requestResponse.status === 401){
        email.value = ''
        password.value = ''
        removeGIF(button, "Entrar")
        return showModal(responseJSON.response)
    }


    const tokenExpiryTime = new Date().setHours(new Date().getHours() + 2)

    removeGIF(button, "Entrar")

    localStorage.setItem('tokenExpiryTime', tokenExpiryTime)
    localStorage.setItem('token', responseJSON.response)
    window.location.href = '/cadastrar-despesas'
}

const updateEmail = async () => {

    const form = document.forms.updateEmailForm

    let { email, button } = form

    if(!email.value){
        email.value = ''
        return showModal('Preencha o campo de email')
    }

    addGIF(button)

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
            email: email.value
        })
    }

    const requestResponse = await fetch(`${api}/user/email/send-token-update-email`, options)
    const responseJSON = await requestResponse.json()

    email.value = ''

    removeGIF(button, "Atualizar Email")

    showModal(responseJSON.response)
}

const verifyEmailUpdate = async () => {

    const options = {
        method: 'PATCH',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }

    const requestResponse = await fetch(`${api}/update-email${location.search}`, options)
    const responseJSON = await requestResponse.json()

    localStorage.setItem('message', responseJSON.response)
    window.location.href = '/configuracoes-usuario'
}

const updateUserPassword = async () => {

    const form = document.forms.updatePassword

    let { passwordCurrent, passwordNew, passwordNewConfirm, button } = form

    if(!passwordCurrent.value || !passwordNew.value || !passwordNewConfirm.value){
        return showModal('Preencha todos os campos')
    }

    if(!passwordRules.test(passwordCurrent.value)) {
        return showModal('Senha atual incorreta')
    }

    if(!passwordRules.test(passwordNew.value)) {
        return showModal('Sua senha precisar ter 8 caracteres, uma letra maiúscula, uma minúscula e um número')
    }

    if(passwordNew.value !== passwordNewConfirm.value) {
        return showModal('As senhas não coincidem')
    }

    addGIF(button)

    const options = {
        method: 'PATCH',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            passwordCurrent: passwordCurrent.value,
            newPassword: passwordNew.value,
            newPasswordConfirm: passwordNewConfirm.value
        })
    }

    const requestResponse = await fetch(`${api}/user/password/update`, options)
    const responseJSON = await requestResponse.json()

    passwordCurrent.value = ''
    passwordNew.value = ''
    passwordNewConfirm.value = ''

    removeGIF(button, "Atualizar Senha")

    showModal(responseJSON.response)
}

const recoverPassword = async () => {

    const form = document.forms.forgetPassword

    const { email, button } = form

    if(!email.value){
        return showModal('Preencha o campo de email')
    }

    addGIF(button);

    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value
        })
    }

    const requestResponse = await fetch(`${api}/user/password/send-token-password-recover`, options)
    const responseJSON = await requestResponse.json()

    email.value = ''

    removeGIF(button, "Enviar Email");

    showModal(responseJSON.response)
}

const confirmRecoverPassword = async () => {

    const form = document.forms.recoverPassword

    const { password, passwordConfirm } = form

    if(!password.value || !passwordConfirm.value){
        return showModal('Preencha todos os campos')
    }

    if(!passwordRules.test(password.value)) {
        return showModal('Sua senha precisar ter 8 caracteres, uma letra maiúscula, uma minúscula e um número')
    }

    if(password.value !== passwordConfirm.value) {
        return showModal('As senhas não coincidem')
    }

    const options = {
        method: 'PATCH',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password.value,
            passwordConfirm: passwordConfirm.value
        })
    }

    const requestResponse = await fetch(`${api}/user/password/password-recover${location.search}`, options)
    const responseJSON = await requestResponse.json()

    if(requestResponse.status === 400){
        return showModal(responseJSON.response)
    }

    localStorage.setItem('message', responseJSON.response)
    window.location.href = '/'
}

const destroyUser = async () => {

    const form = document.forms.deleteUser

    let { password, passwordConfirm, button } = form

    if(!password.value || !passwordConfirm.value){
        return showModal('Preencha todos os campos')
    }

    if(!passwordRules.test(password.value)) {
        return showModal('Senha atual incorreta')
    }

    if(password.value !== passwordConfirm.value) {
        return showModal('As senhas não coincidem')
    }

    addGIF(button);

    const options = {
        method: 'DELETE',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            password: password.value,
            passwordConfirm: passwordConfirm.value
        })
    }

    const requestResponse = await fetch(`${api}/user/delete`, options)
    const responseJSON = await requestResponse.json()

    if(requestResponse.status === 400){
        removeGIF(button, "Excluir Conta");
        return showModal(responseJSON.response)
    }

    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiryTime')
    localStorage.setItem('message', responseJSON.response)
    window.location.href = '/'
}

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiryTime')
    window.location.href = '/'
}

if(window.location.href.indexOf('/verify-email') !== -1) verifyEmail()

if(window.location.href.indexOf('/update-email') !== -1) verifyEmailUpdate()