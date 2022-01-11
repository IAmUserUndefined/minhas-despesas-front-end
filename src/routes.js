import React from 'react';
import { Routes, Route } from "react-router-dom";

import PublicRoute from "./components/PublicRoute/index";
import PrivateRoute from "./components/PrivateRoute/index";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import RecoverPassword from "./pages/RecoverPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyEmailUpdate from "./pages/VerifyEmailUpdate";
import ConfigUser from "./pages/ConfigUser";
import Home from "./pages/Home";
import RegisterExpense from "./pages/RegisterExpense";
import Expenses from "./pages/Expenses";
import UpdateExpense from "./pages/UpdateExpense";
import Modal from "./pages/Modal";

export const AppRoutes = () => {
    return ( 
        <>
            <Routes>
                <Route path="/" element={<PublicRoute />} exact>
                    <Route path="/" element={<Login />} exact />
                </Route>

                <Route path="/register" element={<PublicRoute />} exact>
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/verify-email" element={<PublicRoute />} exact>
                    <Route path="/verify-email" element={<VerifyEmail />} exact />
                </Route>

                <Route path="/forget-password" element={<PublicRoute />} exact>
                    <Route path="/forget-password" element={<ForgetPassword />} exact />
                </Route>

                <Route path="/password-recover" element={<PublicRoute />} exact>
                    <Route path="/password-recover" element={<RecoverPassword />} exact />
                </Route>

                <Route path="/home" element={<PrivateRoute />} exact>
                    <Route path="/home" element={<Home />} exact />
                </Route>

                <Route path="/register-expenses" element={<PrivateRoute />} exact>
                    <Route path="/register-expenses" element={<RegisterExpense />} exact />
                </Route>

                <Route path="/expenses" element={<PrivateRoute />} exact>
                    <Route path="/expenses" element={<Expenses />} exact />
                </Route>

                <Route path="/update-expense" element={<PrivateRoute />} exact>
                    <Route path="/update-expense" element={<UpdateExpense />} exact />
                </Route>


                <Route path="/config-user" element={<PrivateRoute />} exact>
                    <Route path="/config-user" element={<ConfigUser />} exact />
                </Route>

                <Route path="/update-email" element={<PrivateRoute />} exact>
                    <Route path="/update-email" element={<VerifyEmailUpdate/>} exact />
                </Route>
            </Routes>
        </>
     );
}

export const ModalRoute = () => {
    return ( 
        <>
            <Routes>
                <Route path="/*" exact element={<Modal />} />
            </Routes>
        </>
     );
}