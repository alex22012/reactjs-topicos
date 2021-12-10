import md5 from "md5"
import React from "react"
import { useHistory } from "react-router"
import { DashBoardBar, DashBoardItem } from "./styled"

const DashBoardStudentBarComponent = () => {
    const history = useHistory()
    return(
        <DashBoardBar>
            <DashBoardItem onClick={() => history.push("/dashboard/student/schedule")}>Minha agenda</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/student/subjects")}>Disciplinas</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/student/grades")}>Minhas notas</DashBoardItem>
            <DashBoardItem onClick={() => {
                localStorage.removeItem(md5("role"))
                localStorage.removeItem("userId")
                localStorage.removeItem("token")
                history.push("/login")
            }}>Sair</DashBoardItem>
        </DashBoardBar>
    )
}

export default DashBoardStudentBarComponent