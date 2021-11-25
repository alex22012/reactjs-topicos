import React from "react"
import DashBoardTeacherBarComponent from "../components/shared/DashBoardTeacherBarComponent"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const TeacherNewActivityScreen = () => {
    return (
        <DashBoardContainer>
            <DashBoardTeacherBarComponent />
            <DashBoardPage>
                <h2>Cadastre uma tarefa</h2>
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default TeacherNewActivityScreen