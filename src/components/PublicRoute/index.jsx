/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import { useRouter } from 'next/router';

import ContainerBigGif from "../ContainerBigGif"
import LoadingBigGif from "../LoadingBigGif"

import { useAuth } from "../../providers/AuthProvider";

const PublicRoute = (Component) => (props) => {

  const { loading, authenticated } = useAuth();
  const router = useRouter();

  if (loading) {
    return <ContainerBigGif>
      <LoadingBigGif />
    </ContainerBigGif>;
  }

  if (authenticated) {
     router.push("/home");
  }

  return <Component {...props} />

};
 
export default PublicRoute;