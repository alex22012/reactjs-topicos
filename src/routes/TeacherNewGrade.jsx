import React from "react"
import DashBoardTeacherBarComponent from "../components/shared/DashBoardTeacherBarComponent"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const TeacherNewGrade = () => {
    return (
        <DashBoardContainer>
            <DashBoardTeacherBarComponent />
            <DashBoardPage>
                <h2>Cadastre uma nota</h2>
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default TeacherNewGrade