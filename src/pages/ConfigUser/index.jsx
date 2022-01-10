import React, { useState } from "react";

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";
import Form from "../../styles/form";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";
import LoadingGif from "../../components/LoadingGif/index";

import api from "../../services/api";

import isEmailValid from "../../utils/isEmailValid";
import isPasswordValid from "../../utils/isPasswordValid";

import { useModal } from "../../providers/ModalProvider";
import { useAuth } from "../../providers/AuthProvider";

const ConfigUser = () => {
    const { handleShowModal } = useModal();
    const { handleLogout } = useAuth();
    const [buttonChidrenEmail, setButtonChildrenEmail] = useState("Atualizar Email");
    const [buttonChidrenPassword, setButtonChildrenPassword] = useState("Atualizar Senha");
    const [buttonChidrenDelete, setButtonChildrenDelete] = useState("Excluir Usuário");

    const handleUpdateEmail = async () => {
        setButtonChildrenEmail(<LoadingGif />);
    
        const form = document.forms.updateEmail;
    
        let { email } = form;
    
        if (!email.value) {
          setButtonChildrenEmail("Atualizar Email");
          return handleShowModal("Preencha o campo de email");
        }
    
        if (!isEmailValid(email.value)) {
          setButtonChildrenEmail("Atualizar Email");
          email.value = "";
          return handleShowModal("Coloque um email válido");
        }
    
        await api
          .post("/user/email/send-token-update-email", {
            email: email.value,
          })
          .then(({ data }) => {
            handleShowModal(data.response);
          })
          .catch(({ response }) =>
            response
              ? handleShowModal(response.data.response)
              : handleShowModal("Erro no Servidor")
          );
    
        email.value = "";
    
        setButtonChildrenEmail("Atualizar Email");
    };
    
    const handleUpdatePassword = async () => {
        setButtonChildrenPassword(<LoadingGif />);
    
        const form = document.forms.updatePassword;
    
        let { passwordCurrent, newPassword, newPasswordConfirm } = form;
    
        if (
          !passwordCurrent.value ||
          !newPassword.value ||
          !newPasswordConfirm.value
        ) {
          setButtonChildrenPassword("Atualizar Senha");
          return handleShowModal("Preencha todos os campos");
        }
    
        if (!isPasswordValid(passwordCurrent.value)) {
          setButtonChildrenPassword("Atualizar Senha");
          passwordCurrent.value = "";
          newPassword.value = "";
          newPasswordConfirm = "";
          return handleShowModal("Senha atual incorreta");
        }
    
        const { result, message } = isPasswordValid(newPassword.value);
    
        if (!result) {
          setButtonChildrenPassword("Atualizar Senha");
          return handleShowModal(message);
        }
    
        if (newPassword.value !== newPasswordConfirm.value) {
          passwordCurrent.value = "";
          newPassword.value = "";
          newPasswordConfirm = "";
          return handleShowModal("As senhas não coincidem");
        }
    
        await api
          .patch(`/user/password/update`, {
            passwordCurrent: passwordCurrent.value,
            newPassword: newPassword.value,
            newPasswordConfirm: newPasswordConfirm.value,
          })
          .then(({ data }) => {
            handleShowModal(data.response);
          })
          .catch(({ response }) =>
            response
              ? handleShowModal(response.data.response)
              : handleShowModal("Erro no Servidor")
          );
    
        passwordCurrent.value = "";
        newPassword.value = "";
        newPasswordConfirm.value = "";
    
        setButtonChildrenPassword("Atualizar Senha");
    };
    
     const handleDeleteUser = async () => {
        setButtonChildrenDelete(<LoadingGif />);
    
        const form = document.forms.deleteUser;
    
        let { password, passwordConfirm } = form;
    
        if (!password.value || !passwordConfirm.value) {
          setButtonChildrenDelete("Excluir Usuário");
          return handleShowModal("Preencha todos os campos");
        }
    
        const { result } = isPasswordValid(password.value);
    
        if (!result) {
          setButtonChildrenDelete("Excluir Usuário");
          password.value = "";
          passwordConfirm.value = "";
          return handleShowModal("Senha incorreta");
        }
    
        if (password.value !== passwordConfirm.value) {
          setButtonChildrenDelete("Excluir Usuário");
          password.value = "";
          passwordConfirm.value = "";
          return handleShowModal("As senhas não coincidem");
        }
    
        await api
          .delete(`/user/delete`, {
            data: {
              password: password.value,
              passwordConfirm: passwordConfirm.value,
            },
          })
          .then(({ data }) => {
            handleLogout();
            handleShowModal(data.response);
          })
          .catch(({ response }) =>
            response
              ? handleShowModal(response.data.response)
              : handleShowModal("Erro no Servidor")
          );
    
        password.value = "";
        passwordConfirm.value = "";
    
        setButtonChildrenDelete("Excluir Usuário");
    };
    

    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                    <Form name="updateEmail">
                            
                        <h2>Atualizar Email</h2>

                        <FormInput type="email" placeholder="Email" name="email" />

                        <Button onClick={() => handleUpdateEmail()}>{buttonChidrenEmail}</Button>

                    </Form>

                    <Form name="updatePassword">
                        <h2>Atualizar Senha</h2>

                        <FormInput
                            type="password"
                            placeholder="Senha Atual"
                            name="passwordCurrent"
                        />

                        <FormInput
                            type="password"
                            placeholder="Nova Senha"
                            name="newPassword"
                        />

                        <FormInput
                            type="password"
                            placeholder="Confirmação de Nova Senha"
                            name="newPasswordConfirm"
                        />

                        <Button onClick={() => handleUpdatePassword()}>{buttonChidrenPassword}</Button>
                    </Form>

                    <Form name="deleteUser">
                        <h2>Excluir Usuário</h2>

                        <FormInput 
                            type="password" 
                            placeholder="Senha" 
                            name="password" 
                        
                        />
                        <FormInput
                            type="password"
                            placeholder="Confirmação de Senha"
                            name="passwordConfirm"
                        />

                        <Button onClick={() => handleDeleteUser()}>{buttonChidrenDelete}</Button>
                    </Form>
            </ContainerMain>
        </>
     );
}
 
export default ConfigUser;