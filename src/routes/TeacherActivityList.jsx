import React, {useState, useEffect} from "react"
import { getAllSubjectPendingActivitys } from "../api/subjectRequests"
import { getTeacherSubject } from "../api/teachersRequests"
import { useHistory } from "react-router"
import DashBoardTeacherBarComponent from "../components/shared/DashBoardTeacherBarComponent"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"
import { Card } from "@mui/material"
import Loading from "../components/shared/Loading"

const TeacherActivityList = () => {
    const history = useHistory()
    const [activitys, setActivitys] = useState([])
    const [subjectId, setSubjectId] = useState(null)
    const [loading, setLoading] = useState(false)
    const getPendingActivitys = async (id) => {
        const resp = await getAllSubjectPendingActivitys(id)
        setActivitys(resp)
        setLoading(false)
    }
    useEffect(() => {
        const getSubject = async () => {
            setLoading(true)
            let id = localStorage.getItem("userId")
            const resp = await getTeacherSubject(id)
            if(resp.length > 0){
                localStorage.setItem("subjectId", resp[0]._id)
                setSubjectId(resp[0]._id)
                await getPendingActivitys(resp[0]._id)
            }
        }
        async function fetchData() {
            await getSubject()
        }
        fetchData()
    }, [])
    return (
        <>
            {loading === false && 
                <DashBoardContainer>
                    <DashBoardTeacherBarComponent />
                    <DashBoardPage>
                        <h2>Lista de atividades pendentes</h2>
                        {activitys.map((value, index) => {
                            let prazo = Math.round((new Date(value.endDate).getTime() - new Date().getTime()) / 1000/60/60/24)
                            return (
                                <Card style={{width:400, padding:10, margin:10}} key={index} onClick={() => {
                                    localStorage.setItem("activityId", value._id)
                                    localStorage.setItem("activityName", value.body)
                                    history.push("/dashboard/teacher/new-grade")
                                }}>
                                    <p>{value.body}</p>
                                    <p>{prazo} dias</p>
                                </Card>
                            )
                        })}
                        {activitys.length === 0 && <h4>Nenhuma atividade pendente</h4>}
                    </DashBoardPage>
                </DashBoardContainer>
            }
            {loading === true && <Loading />}
        </>
    )
}

export default TeacherActivityList