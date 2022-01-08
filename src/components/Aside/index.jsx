import React from 'react';
import { useNavigate } from "react-router-dom";

import ContainerAside from './styles';

import { AiOutlineHome } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
import { GiExpense } from "react-icons/gi";
import { GrConfigure } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";

import { useMenu } from "../../providers/MenuProvider";

const Aside = () => {
    const navigate = useNavigate();
    const handleLink = (link) => navigate(link);  
    const { left } = useMenu();

    return ( 
        <>
            <ContainerAside left={left}>
                <ul>
                    <li onClick={() => handleLink("/home")}><AiOutlineHome /> Home</li>
                    <li onClick={() => handleLink("/add-expenses")}><GiArchiveRegister /> Cadastrar Despesas</li>
                    <li onClick={() => handleLink("/expenses")}><GiExpense /> Consultar Despesas</li>
                    <li onClick={() => handleLink("/config-user")}><GrConfigure /> Configurações do Usuário</li>
                    <li onClick={() => handleLink("/")}><FiLogOut /> Logout</li>
                </ul>

            </ContainerAside>
        </>
     );
}
 
export default Aside;