const isPasswordValid = (password) => {
    return {
        result: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/.test(password),
        message: 'Sua senha precisa ter 8 caracteres, uma letra maiuscula, uma letra minuscula e um número'
    }
}

export default isPasswordValid;
