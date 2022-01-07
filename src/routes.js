import { Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<h1>Olá Mundo</h1>} exact />
            </Routes>
        </>
    )
}