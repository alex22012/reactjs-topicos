import React, {useState, useEffect} from "react"
import { getAllClassActivitys } from "../api/classRequests"
import { finishActivity, getStudentClass } from "../api/studentRequests"
import { getAllSubjectActivitys, getClassSubjects } from "../api/subjectRequests"
import DashBoardStudentBarComponent from "../components/shared/DashBoardStudentBar"
import { useHistory } from "react-router"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"
import { MenuItem, FormControl, InputLabel, Select, Button, Card, CardHeader, CardContent } from "@mui/material"
import Loading from "../components/shared/Loading"

const StudentScheduleScreen = () => {
    const history = useHistory()
    //Aqui eu pego a lista de todas as atividades da turma e permito ele filtrar por uma disciplina
    const [activitys, setActivitys] = useState([])
    const [subjects, setSubjects] = useState([]) 
    const [subjectId, setSubjectId] = useState(null)
    const [loading, setLoading] = useState(false)
    const getSubjects = async (classId) => {
        const resp = await getClassSubjects(classId)
        if(resp.length > 0){
            setSubjectId(resp[0]._id)
            setSubjects(resp)
            setLoading(false)
        }else 
            setSubjectId([])
    }
    const getClassActivitys = async (classId) => {
        const resp = await getAllClassActivitys(classId)
        setActivitys(resp)
    }
    const getSubjectActivitys = async () => {
        const resp = await getAllSubjectActivitys(subjectId)
        setActivitys(resp)
    }
   
    useEffect(() => {
        const getClass = async () => {
            setLoading(true)
            let id = localStorage.getItem("userId")
            const resp = await getStudentClass(id)
            await getClassActivitys(resp._id)
            await getSubjects(resp._id)
        }   
        async function fetchData() {
            await getClass()
        }
        fetchData()
    }, [])
    return(
        <div>
            {loading === false && 
                <>
                    <DashBoardContainer>
                        <DashBoardStudentBarComponent />
                        <DashBoardPage>
                            <h2>Lista de atividades</h2>
                            <FormControl>
                                <InputLabel>Disciplina</InputLabel>
                                <Select
                                    style={{width:300, margin:10}}
                                    labelId="demo-label-schedule"
                                    id="demo-schedule"
                                    value={`${subjectId}`}
                                    label="Disciplina"
                                    onChange={e => setSubjectId(e.target.value)}
                                >
                                    {subjects.map((value, index) => {
                                        return (
                                            <MenuItem key={index} value={value._id}>{value.subjectName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <Button onClick={() => getSubjectActivitys()} variant="contained" color="primary">Filtrar</Button>
                            {activitys.map((value, index) => {
                                    let prazo = new Date(value.endDate).getTime() - new Date().getTime()
                                    let tempo = Math.round(prazo / 1000 / 60 / 60 / 24)
                                    //Da um find no array de subjects, pega o _id dele que seja o classId na activity
                                    return (
                                        <Card style={{margin:10, width:400}} key={index} onClick={() => history.push("/dashboard/student/schedule/activity/"+value._id)}>
                                            <CardHeader>
                                                <h3>Atividade</h3>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{value.body}</p>
                                                <p>Prazo: {tempo} dias</p>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            {activitys.length === 0 && <h4>Nenhuma atividade pendente</h4>}
                        </DashBoardPage>
                    </DashBoardContainer>
                </>
            }
            {loading === true && <Loading />}
        </div>
    )
}

export default StudentScheduleScreen