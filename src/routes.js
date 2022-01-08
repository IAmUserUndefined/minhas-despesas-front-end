import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import RecoverPassword from "./pages/RecoverPassword";

export const AppRoutes = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/register" element={<Register />} exact />
                <Route path="/forget-password" element={<ForgetPassword />} exact />
                <Route path="/recover-password" element={<RecoverPassword />} exact />
            </Routes>
        </>
    )
}