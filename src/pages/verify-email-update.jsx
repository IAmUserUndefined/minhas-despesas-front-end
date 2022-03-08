import React, { useEffect } from "react";
import { useRouter } from 'next/router';

import VerifyEmailTitle from "../components/VerifyEmailTitle/index";

import api from "../services/api/clientApi";

import { useModal } from "../providers/ModalProvider";

import auth from "../services/auth";

const VerifyEmailUpdate = () => {
    const { handleShowModal } = useModal();
    const router = useRouter();
    const [, query] = router.asPath.split("?");
  
    useEffect(() => {
      const handleVerifyEmailUpdate = async () => {
        await api
          .patch(`/update-email?${query}`)
          .then(({ data }) => handleShowModal(data.response))
          .catch(({ response }) =>
            response
              ? handleShowModal(response.data.response)
              : handleShowModal("Erro no Servidor")
          );
      };
  
      handleVerifyEmailUpdate();
      router.push("/");
    });

    return ( 
        <>
            <VerifyEmailTitle />
        </>
     );
}
 
export const getServerSideProps = (context) => auth(context);

export default VerifyEmailUpdate;