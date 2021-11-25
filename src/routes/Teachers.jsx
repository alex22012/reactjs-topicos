import React, {useState, useEffect} from "react"
import { getAllTeachers } from "../api/teachersRequests"
import DashBoardAdminBarComponent from "../components/shared/DashBoardAdminBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const TeachersScreen = () => {
    const [teachers, setTeachers] = useState([])
    const getTeachers = async () => {
        const resp = await getAllTeachers()
        setTeachers(resp)
    }
    useEffect(() => {
        async function fetchData() {
            await getTeachers()
        }   
        fetchData()
    })
    return (
        <DashBoardContainer>
            <DashBoardAdminBarComponent />
            <DashBoardPage>
                {teachers.length === 0 && <h2>Sua escola não possui professores cadastrados</h2>}
                <button>Novo professor</button>
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default TeachersScreen