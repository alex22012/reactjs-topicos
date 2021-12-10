import React, {useState, useEffect} from "react"
import { getAllStudentGrades, getStudentClass, getStudentSubjectGrades } from "../api/studentRequests"
import { getClassSubjects } from "../api/subjectRequests"
import DashBoardStudentBarComponent from "../components/shared/DashBoardStudentBar"
import Loading from "../components/shared/Loading"
import { FormControl, InputLabel, Select, MenuItem, Button, Card, CardHeader, CardContent } from "@mui/material"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const StudentGradesScreen = () => {
    //Primeiro pego todas as notas do estudante, depois pego as disciplinas e permito ele filtrar os resultados
    const [grades, setGrades] = useState([])
    const [subjects, setSubjects] = useState([])
    const [subjectId, setSubjectId] = useState([])
    const [loading, setLoading] = useState(false)
    const getAllStudentSubjectGrades = async (subId = subjectId) => {
        let id = localStorage.getItem("userId")
        const resp = await getStudentSubjectGrades(id, subId)
        setGrades(resp)
        setLoading(false)
    }
    useEffect(() => {
        const getClassId = async () => {
            setLoading(true)
            let id = localStorage.getItem("userId")
            const resp = await getStudentClass(id)
            const subjects = await getClassSubjects(resp._id)
            if(subjects.length > 0){
                setSubjects(subjects)
                setSubjectId(subjects[0]._id)
                await getAllStudentSubjectGrades(subjects[0]._id)
            }else 
                setSubjects([])
        }
        async function fetchData() {
            await getClassId()
        }
        fetchData()
    }, [])
    return (
        <div>
            {loading === false &&
                <>
                    <DashBoardContainer>
                        <DashBoardStudentBarComponent />
                        <DashBoardPage>
                            <h2>Suas notas</h2>
                            {/**Permito filtrar */}
                            <FormControl>
                                <InputLabel>Disciplina</InputLabel>
                                <Select
                                    style={{width:300, margin:10}}
                                    labelId="demo-label-grades"
                                    id="demo-grades"
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
                            <Button style={{margin:10}} color="primary" variant="contained" onClick={() => getAllStudentSubjectGrades()}>Filtrar</Button>
                            {grades.map((value, index) => {
                                return (
                                    <Card key={index} style={{width:400}}>
                                        <CardContent>
                                            <p>Atividade: {value.activityName}</p>
                                            <p>Nota: {value.grade}</p>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                            {grades.length === 0 && <h4>Nenhuma nota cadastrada</h4>}
                        </DashBoardPage>
                    </DashBoardContainer>
                </>
            }
            {loading === true && <Loading />}
        </div>
    )
}

export default StudentGradesScreen