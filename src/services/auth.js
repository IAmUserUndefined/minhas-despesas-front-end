import nookies from "nookies";

const auth = (context) => {
    const token = nookies.get(context).tokenMinhasDespesas;
    const tokenExpiryTime = nookies.get(context).tokenExpiryTimeMinhasDespesas;
    const redirect = {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
    const authentification = () => {
        nookies.destroy(undefined,"tokenMinhasDespesas");
        nookies.destroy(undefined, "tokenExpiryTimeMinhasDespesas");
        return redirect;
    }

    return !token ? authentification() 
                : Date.now() > parseInt(tokenExpiryTime) ? authentification() : null; 
}

export default auth;