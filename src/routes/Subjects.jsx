import React, {useState, useEffect} from "react"
import { getAllSubjects } from "../api/subjectRequests"
import DashBoardAdminBarComponent from "../components/shared/DashBoardAdminBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const SubjectsScreen = () => {
    const [subjects, setSubjects] = useState([])
    const getSubjects = async () => {
        const resp = await getAllSubjects()
        setSubjects([])
    }
    useEffect(() => {
        async function fetchData() {
            await getSubjects()
        }   
        fetchData()
    }, [])
    return (
        <DashBoardContainer>
            <DashBoardAdminBarComponent />
            <DashBoardPage>
                {subjects.length === 0 && <h2>Sua escola não tem disciplinas cadastradas</h2>}
                <button>Nova disciplina</button>
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default SubjectsScreen