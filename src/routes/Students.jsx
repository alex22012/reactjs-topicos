import React, {useState, useEffect} from "react"
import DashBoardAdminBarComponent from "../components/shared/DashBoardAdminBar"
import { getAllStudents } from "../api/studentRequests"

import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const StudentScreen = () => {
    const [students, setStudents] = useState([])
    const getStudents = async () => {
        const resp = await getAllStudents()
        setStudents(resp)
    }
    useEffect(() => {
        getStudents()
    }, [])
    return (
        <DashBoardContainer>
            <DashBoardAdminBarComponent selectedComponet={"students"}/>
            <DashBoardPage>
                {students.length === 0 && <h2>Sua escola não possui estudantes cadastrados</h2>}
                <button>Novo estudante</button>
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default StudentScreen