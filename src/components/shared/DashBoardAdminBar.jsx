import React from "react"
import { useHistory } from "react-router"
import { DashBoardBar, DashBoardItem } from "./styled"

const DashBoardAdminBarComponent = (props) => {
    const history = useHistory()
    return (
        <DashBoardBar>
            <DashBoardItem onClick={() => history.push("/dashboard/classes")}>Turmas</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/students")}>Alunos</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/subjects")}>Disciplina</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/teachers")}>Professores</DashBoardItem>
        </DashBoardBar>
    )
}

export default DashBoardAdminBarComponent