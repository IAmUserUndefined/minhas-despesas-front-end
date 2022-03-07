import React, { createContext, useContext } from "react";
import hook from "./hooks/useAuth";

const AuthContext = createContext();

// Os campos que estão são uma estratégia de autentificação feita pelo front-end
// Dessa forma tirando a responsabilidade do servidor

export const AuthProvider = ({ children }) => {
  const {
    handleLogin,
    handleLogout,
    // authenticated,
    // loading,
    // expirySession,
    // setExpirySession,
    buttonChildren,
    formValues, 
    setFormValues
  } = hook();

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        // authenticated,
        // loading,
        // expirySession,
        // setExpirySession,
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