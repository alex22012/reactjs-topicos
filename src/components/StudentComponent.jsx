import React, {useState} from "react"
import DashBoardStudentBarComponent from "./shared/DashBoardStudentBar"
import { DashBoardContainer, DashBoardPage } from "./shared/styled"

const StudentComponent = () => {
    return (
       <DashBoardContainer>
           <DashBoardStudentBarComponent />
           <DashBoardPage>
               Bem vindo estudante
           </DashBoardPage>
       </DashBoardContainer>
    )
}

export default StudentComponent