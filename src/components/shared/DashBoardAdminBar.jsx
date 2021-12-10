import React from "react"
import { useHistory } from "react-router"
import { DashBoardBar, DashBoardItem } from "./styled"
import md5 from "md5"

const DashBoardAdminBarComponent = (props) => {
    const history = useHistory()
    return (
        <DashBoardBar>
            <DashBoardItem onClick={() => history.push("/dashboard/classes")}>Turmas</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/students")}>Alunos</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/subjects")}>Disciplina</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/teachers")}>Professores</DashBoardItem>
            <DashBoardItem onClick={() => {
                localStorage.removeItem("userId")
                localStorage.removeItem(md5("role"))
                localStorage.removeItem("token")
                history.push("/login")
            }}>Sair</DashBoardItem>
        </DashBoardBar>
    )
}

export default DashBoardAdminBarComponent