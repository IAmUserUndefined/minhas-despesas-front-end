import React from "react";

import PagesContainer from "../../components/PagesContainer/index";
import Form from "../../styles/form";
import TitleForm from "../../components/FormTitle/index";
import FormInput from "../../components/FormInput/index";
import FormLink from "../../components/FormLink/index";
import Button from "../../components/Button/index";

const Register = () => {
  
    return (
      <>
        <PagesContainer>
          <Form name="register">
            
            <TitleForm>
              Cadastro
            </TitleForm>

            <FormInput type="email" name="email" placeholder="Email" />
            <FormInput type="password" name="password" placeholder="Senha" />
            <FormInput type="password" name="passwordConfirm" placeholder="Confirmação de Senha" />
  
            <Button>
              Cadastrar
            </Button>
  
            <FormLink link="/">Já tem um cadastro?</FormLink>
          </Form>
        </PagesContainer>
      </>
    );
  };
  
export default Register;