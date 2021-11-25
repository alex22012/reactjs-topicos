import React, {useState, useEffect} from "react"
import DashBoardStudentBarComponent from "../components/shared/DashBoardStudentBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const StudentSubjectsScreen = () => {
    const [subjects, setSubjects] = useState([])
    const getStudentSubjects = async () => {
        setSubjects([])
    }
    useEffect(() => {
        async function fetchData() {
            await getStudentSubjects()
        }
        fetchData()
    }, [])
    return (
        <DashBoardContainer>
            <DashBoardStudentBarComponent />
            <DashBoardPage>
                {subjects.length === 0 && <h2>Nenhuma disciplina cadastrada</h2>}
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default StudentSubjectsScreen