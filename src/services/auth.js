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
    const props = {
        props: {}
    }

    return !token ? redirect 
                : Date.now() < tokenExpiryTime ? props : redirect; 
}

export default auth;