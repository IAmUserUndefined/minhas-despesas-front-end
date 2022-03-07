/* eslint-disable react-hooks/exhaustive-deps */

// Os campos que estão são uma estratégia de autentificação feita pelo front-end
// Dessa forma tirando a responsabilidade do servidor
// Os últimos campos comentados são os componentes que fazem essa autenficação no servidor

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";

import api from "../../services/api/clientApi";

import isEmailValid from "../../utils/isEmailValid";
import isPasswordValid from "../../utils/isPasswordValid";

import { useModal } from "../ModalProvider";

import LoadingGif from "../../components/LoadingGif";

const useAuth = () => {
  // const [authenticated, setAuthenticated] = useState(false);
  // const [expirySession, setExpirySession] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [buttonChildren, setButtonChildren] = useState("Login");
  const [formValues, setFormValues] = useState({});
  const { handleShowModal } = useModal();
  const router = useRouter();

  // useEffect(() => {
  //   const token = nookies.get().tokenMinhasDespesas;
  //   const tokenExpirytime = nookies.get().tokenExpiryTimeMinhasDespesas;

  //   if (token) {

  //     if(Date.now() < parseInt(tokenExpirytime)) {
  //       setAuthenticated(true);
  //     }else{
  //       setExpirySession(false);
  //       handleLogout();
  //     }
      
  //   }
  //   setLoading(false);
  // }, []);

  const handleLogin = async (e) => {

    e.preventDefault();

    const { email, password } = e.target;

    if (!email.value || !password.value)
      return handleShowModal("Preencha todos os campos");

    if (!isEmailValid(email.value))
      return handleShowModal("Email/Senha Incorreto(s)");

    const { result } = isPasswordValid(password.value);

    if (!result) 
      return handleShowModal("Email/Senha Incorreto(s)");

    setButtonChildren(<LoadingGif />);

    const tokenExpiryTime = new Date().setHours(new Date().getHours() + 2);

    await api
      .post("/user/login", {
        email: email.value,
        password: password.value,
      })
      .then(({ data }) => {
        setFormValues({});
        setButtonChildren("Login");
        nookies.set(undefined, "tokenMinhasDespesas", data.response, { maxAge: 60 * 60 * 2 });
        nookies.set(undefined, "tokenExpiryTimeMinhasDespesas", tokenExpiryTime, { maxAge: 60 * 60 * 2 });
        api.defaults.headers = { "Authorization": `Bearer ${data.response}` };
        router.push("/home");
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor, tente novamente mais tarde")
      );

    setButtonChildren("Login");
  };

  const handleLogout = () => {
    nookies.destroy(undefined,"tokenMinhasDespesas");
    nookies.destroy(undefined, "tokenExpiryTimeMinhasDespesas");
    api.defaults.headers = { "Authorization": undefined };
    router.push("/");
  };

  return { 
    handleLogin, handleLogout, buttonChildren, formValues, setFormValues 
  };
};

export default useAuth;

// const PrivateRoute = (Component) => (props) => {

//   const { loading, authenticated, expirySession, setExpirySession, handleLogout } = useAuth();
//   const router = useRouter();

//   if (loading) {
//     return <LoadingBigGifContainer>
//       <LoadingBigGif />
//     </LoadingBigGifContainer>;
//   }

//   if (!authenticated) {
//     router.push("/");
//   }

//   return <Component {...props} />

// };

// const PublicRoute = (Component) => (props) => {

//   const { loading, authenticated } = useAuth();
//   const router = useRouter();

//   if (loading) {
//     return <LoadingBigGifContainer>
//       <LoadingBigGif />
//     </LoadingBigGifContainer>;
//   }

//   if (authenticated) {
//      router.push("/home");
//   }

//   return <Component {...props} />

// };