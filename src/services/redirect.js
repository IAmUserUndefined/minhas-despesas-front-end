import nookies from "nookies";

const redirect = (context) => {
    const token = nookies.get(context).tokenMinhasDespesas;
    const redirect = {
        redirect: {
            destination: '/home',
            permanent: false,
        }
    }
    const props = {
        props: {}
    }

    return !token ? props : redirect; 
}

export default redirect;