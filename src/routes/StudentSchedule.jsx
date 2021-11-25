import React, {useState, useEffect} from "react"
import DashBoardStudentBarComponent from "../components/shared/DashBoardStudentBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const StudentScheduleScreen = () => {
    const [schedule, setSchedule] = useState([])
    const getSchedule = async () => {
        //Primeiro pega o id da turma do estudante e ai pega as atividades da turma
        setSchedule([])
    }
    useEffect(() => {
        async function fetchData() {
            await getSchedule()
        }
        fetchData()
    }, [])
    return(
        <DashBoardContainer>
            <DashBoardStudentBarComponent />
            <DashBoardPage>
                {schedule.length === 0 && <h2>Nenhuma atividade pendente</h2>}
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default StudentScheduleScreen