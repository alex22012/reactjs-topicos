import React from "react"
import { useHistory } from "react-router"
import { DashBoardBar, DashBoardItem } from "./styled"

const DashBoardTeacherBarComponent = () => {
    const history = useHistory()
    return(
        <DashBoardBar>
            <DashBoardItem onClick={() => history.push("/dashboard/teacher/new-activity")}>Nova atividade</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/teacher/new-grade")}>Lançamento de notas</DashBoardItem>
        </DashBoardBar>
    )
}

export default DashBoardTeacherBarComponent