const isEmailValid = (email) => {
    const [, domainAndDotCom] = email.split("@");
    const [domain] = domainAndDotCom.split(".");

    if(domain.length > 20)
        return false;
    
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email);
}

export default isEmailValid;
