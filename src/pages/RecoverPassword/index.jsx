import React from "react";

import Header from "../../components/Header/index"
import PagesContainer from "../../components/PagesContainer/index";
import Form from "../../styles/form";
import TitleForm from "../../components/FormTitle/index";
import FormInput from "../../components/FormInput/index";
import Button from "../../components/Button/index";

const RecoverPassword = () => {
  
    return (
      <>
        <Header />
        <PagesContainer>
          <Form name="recoverPassword">

            <TitleForm>
                Recuperação de Senha
            </TitleForm>

              <FormInput
                  type="password"
                  placeholder="Nova Senha"
                  name="password"
              />
  
              <FormInput
                type="password"
                placeholder="Confirmação de Nova Senha"
                name="passwordConfirm"
              />
  
            <Button>
              Atualizar Senha
            </Button>
  
          </Form>
        </PagesContainer>
      </>
    );
  };
  
export default RecoverPassword;