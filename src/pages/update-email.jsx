/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useRouter } from 'next/router';

import PrivateRoute from "../components/PrivateRoute";
import VerifyEmailTitle from "../components/VerifyEmailTitle/index";

import api from "../services/api/clientApi";

import { useModal } from "../providers/ModalProvider";

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
    }, []);

    return ( 
        <>
            <VerifyEmailTitle />
        </>
     );
}

export default PrivateRoute(VerifyEmailUpdate);