import React, { createContext, useContext } from "react";
import hook from "./hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    handleLogin,
    handleLogout,
    authenticated,
    loading,
    expirySession,
    setExpirySession,
    buttonChildren,
    formValues, 
    setFormValues
  } = hook();

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        authenticated,
        loading,
        expirySession,
        setExpirySession,
        buttonChildren,
        formValues, 
        setFormValues
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);