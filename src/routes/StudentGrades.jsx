import React, {useState, useEffect} from "react"
import DashBoardStudentBarComponent from "../components/shared/DashBoardStudentBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const StudentGradesScreen = () => {
    const [grades, setGrades] = useState([])
    const getStudentGrades = async () => {
        setGrades([])
    }
    useEffect(() => {
        async function fetchData() {
            await getStudentGrades()
        }
        fetchData()
    }, [])
    return (
        <DashBoardContainer>
            <DashBoardStudentBarComponent />
            <DashBoardPage>
                {grades.length === 0 && <h2>Nenhuma nota cadastrada</h2>}
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default StudentGradesScreen