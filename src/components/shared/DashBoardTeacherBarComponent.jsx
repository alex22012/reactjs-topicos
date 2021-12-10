import React from "react"
import { useHistory } from "react-router"
import { DashBoardBar, DashBoardItem } from "./styled"
import md5 from "md5"

const DashBoardTeacherBarComponent = () => {
    const history = useHistory()
    return(
        <DashBoardBar>
            <DashBoardItem onClick={() => history.push("/dashboard/teacher/new-activity")}>Nova atividade</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/teacher/activity-list")}>Lançamento de notas</DashBoardItem>
            <DashBoardItem onClick={() => history.push("/dashboard/teacher/view-activitys")}>Corrigir atividades</DashBoardItem>
            <DashBoardItem onClick={() => {
                localStorage.removeItem(md5("role"))
                localStorage.removeItem("userId")
                localStorage.removeItem("token")
                history.push("/login")
            }}>Sair</DashBoardItem>
        </DashBoardBar>
    )
}

export default DashBoardTeacherBarComponent