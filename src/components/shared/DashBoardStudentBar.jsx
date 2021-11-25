import React from "react"
import { useHistory } from "react-router"
import { DashBoardBar, DashBoardItem } from "./styled"

const DashBoardStudentBarComponent = () => {
    return(
        <DashBoardBar>
            <DashBoardItem>Minha agenda</DashBoardItem>
            <DashBoardItem>Disciplinas</DashBoardItem>
            <DashBoardItem>Minhas notas</DashBoardItem>
        </DashBoardBar>
    )
}

export default DashBoardStudentBarComponent