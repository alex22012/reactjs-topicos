import React, {useState} from "react"
import DashBoardAdminBarComponent from "./shared/DashBoardAdminBar"
import { DashBoardContainer, DashBoardPage } from "./shared/styled"

const AdminComponent = () => {
    return (
        <DashBoardContainer>
            <DashBoardAdminBarComponent />
            <DashBoardPage>
                Bem vindo administrador
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default AdminComponent