import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import RecoverPassword from "./pages/RecoverPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyEmailUpdate from "./pages/VerifyEmailUpdate";
import ConfigUser from "./pages/ConfigUser";

export const AppRoutes = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/register" element={<Register />} exact />
                <Route path="/verify-email" element={<VerifyEmail />} exact />
                <Route path="/forget-password" element={<ForgetPassword />} exact />
                <Route path="/recover-password" element={<RecoverPassword />} exact />
                <Route path="/update-email" element={<VerifyEmailUpdate />} exact />
                <Route path="/config-user" element={<ConfigUser />} exact />
            </Routes>
        </>
    )
}