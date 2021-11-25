import React, {useState} from "react"
import DashBoardTeacherBarComponent from "./shared/DashBoardTeacherBarComponent"
import { DashBoardContainer, DashBoardPage } from "./shared/styled"

const TeacherComponent = () => {
    return (
        <DashBoardContainer>
            <DashBoardTeacherBarComponent />
            <DashBoardPage>
                Bem vindo professor
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default TeacherComponent