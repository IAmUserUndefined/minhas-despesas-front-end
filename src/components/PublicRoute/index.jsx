import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from '../../providers/AuthProvider';

import LoadingBigGifContainer from '../ContainerBigGif/index';
import LoadingBigGif from "../LoadingBigGif/index";

const PublicRoute = () => {

  const { loading, authenticated } = useAuth();

  if (loading) {
    return <LoadingBigGifContainer>
      <LoadingBigGif />
    </LoadingBigGifContainer>;
  }

  if (authenticated) {
    return <Navigate to="/home" />
  }

  return <Outlet />
};

export default PublicRoute;