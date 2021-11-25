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
        </DashBoardBar>
    )
}

export default DashBoardStudentBarComponent