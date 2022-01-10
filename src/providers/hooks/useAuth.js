import { useState, useEffect } from "react";

import api from "../../services/api";
import history from "../../services/history";

import isEmailValid from "../../utils/isEmailValid";
import isPasswordValid from "../../utils/isPasswordValid";

import { useModal } from "../ModalProvider";

import LoadingGif from "../../components/LoadingGif";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [expirySession, setExpirySession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonChildren, setButtonChildren] = useState("Login");
  const { handleShowModal } = useModal();

  const handleLogin = async () => {
    setButtonChildren(<LoadingGif />);

    const form = document.forms.login;

    let { email, password } = form;

    if (!email.value || !password.value) {
      setButtonChildren("Login");
      return handleShowModal("Preencha todos os campos");
    }

    if (!isEmailValid(email.value)) {
      email.value = "";
      password.value = "";
      setButtonChildren("Login");
      return handleShowModal("Email/Senha Incorreto(s)");
    }

    const { result } = isPasswordValid(password.value);

    if (!result) {
      email.value = "";
      password.value = "";
      setButtonChildren("Login");
      return handleShowModal("Email/Senha Incorreto(s)");
    }

    await api
      .post("/user/login", {
        email: email.value,
        password: password.value,
      })
      .then(({ data }) => {
        setButtonChildren("Login");
        localStorage.setItem("token", data.response);
        localStorage.setItem("tokenExpiryTime", new Date().setHours(new Date().getHours() + 2));
        api.defaults.headers = { "Authorization": `Bearer ${data.response}` };
        setAuthenticated(true);
        history.push("/feed");
      })
      .catch(({ response }) =>
        response
          ? handleShowModal(response.data.response)
          : handleShowModal("Erro no Servidor")
      );

      email.value = "";
      password.value = "";

      setButtonChildren("Login");
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiryTime");
    api.defaults.headers = { "Authorization": undefined };
    history.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpirytime = localStorage.getItem("tokenExpiryTime");

    if (token) {

      if(Date.now() < tokenExpirytime) {
        setAuthenticated(true);
      }else{
        setExpirySession(false);
        handleLogout();
      }
      
    }
    setLoading(false);
  }, []);

  return { handleLogin, handleLogout, authenticated, loading, expirySession, setExpirySession, buttonChildren };
};

export default useAuth;
