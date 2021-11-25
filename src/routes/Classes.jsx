import React, {useState, useEffect} from "react"
import { getAllClasses } from "../api/classesRequests"
import DashBoardAdminBarComponent from "../components/shared/DashBoardAdminBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const ClassesScreen = () => {
    const [classes, setClasses] = useState([])
    const getClasses = async () => {
        const resp = await getAllClasses()
        setClasses(resp)
    }
    useEffect(() => {
        async function fetchData() {
            await getClasses()
        }
        fetchData()
    }, [])
    return (
        <DashBoardContainer>
            <DashBoardAdminBarComponent/>
            <DashBoardPage>
                {classes.length === 0 && <h2>Você não tem turmas cadastradas na sua escola</h2>}
                <button>Nova turma</button>
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default ClassesScreen