import React from 'react';

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import ContainerMain from "../../components/ContainerMain";
import Form from "../../styles/form";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";

const ConfigUser = () => {
    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                    <Form name="updateEmail">
                            
                        <h2>Atualizar Email</h2>

                        <FormInput type="email" placeholder="Email" name="email" />

                        <Button>Atualizar Email</Button>

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

                        <Button>Atualizar Senha</Button>
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

                        <Button>Excluir Usuário</Button>
                    </Form>
            </ContainerMain>
        </>
     );
}
 
export default ConfigUser;