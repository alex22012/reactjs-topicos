import React, {useState, useEffect} from "react"
import { useHistory } from "react-router"
import { Card, Button } from "@mui/material"
import { getAllClasses } from "../api/classRequests"
import DashBoardAdminBarComponent from "../components/shared/DashBoardAdminBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const ClassesScreen = () => {
    const history = useHistory()
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
                {classes.length > 0 && <h2>Lista de turmas</h2>}
                <Button color="secondary" variant="contained" style={{margin:10}} onClick={() => history.push("/dashboard/classes/new-class")}>Nova turma</Button>
                {classes.map((value, index) => {
                    return (
                        <Card style={{width:400, margin:10, padding:10}} key={index} onClick={() => history.push(`/dashboard/class/${value._id}/more-info`)}>
                            <p>{value.name}</p>
                        </Card> 
                    )
                })}
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default ClassesScreen