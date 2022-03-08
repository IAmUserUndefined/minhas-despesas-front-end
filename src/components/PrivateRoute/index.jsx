/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import { useRouter } from 'next/router';

import ContainerBigGif from "../ContainerBigGif"
import LoadingBigGif from "../LoadingBigGif"

import { useAuth } from "../../providers/AuthProvider";

const PrivateRoute = (Component) => (props) => {

  const { loading, authenticated, expirySession, setExpirySession, handleLogout } = useAuth();
  const router = useRouter();

  if (loading) {
    return <ContainerBigGif>
      <LoadingBigGif />
    </ContainerBigGif>;
  }

  if (!authenticated) {
    router.push("/");
  }

  return <Component {...props} />
};

export default PrivateRoute;