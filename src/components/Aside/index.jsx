import React from 'react';
import Link from "next/link";

import ContainerAside from './styles';

import { AiOutlineHome } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
import { GiExpense } from "react-icons/gi";
import { GrConfigure } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";

import { useMenu } from "../../providers/MenuProvider";
import { useAuth } from "../../providers/AuthProvider";

const Aside = () => {
    const handleLink = (link) => navigate(link);  
    const { left, closeMenu } = useMenu();
    const { handleLogout } = useAuth();

    return ( 
        <>
            <ContainerAside left={left}>
                <ul>
                    <li onClick={() => { closeMenu() }}>
                        <AiOutlineHome /> 
                        <Link href="/home">Home</Link>
                    </li>

                    <li onClick={() => { closeMenu() }}>
                        <GiArchiveRegister /> 
                        <Link href="/register-expenses">Cadastrar Despesas</Link>
                    </li>

                    <li onClick={() => { closeMenu() }}>
                        <GiExpense /> 
                        <Link href="/expenses">Consultar Despesas</Link>
                    </li>

                    <li onClick={() => { closeMenu() }}>
                        <GrConfigure /> 
                        <Link href="/config-user">Configurações do Usuário</Link>
                    </li>

                    <li onClick={() => handleLogout()}>
                        <FiLogOut /> 
                        Logout
                    </li>
                </ul>

            </ContainerAside>
        </>
     );
}
 
export default Aside;