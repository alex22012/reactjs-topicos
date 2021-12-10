import { Card } from "@mui/material"
import React, {useState, useEffect} from "react"
import { getAllClassSubjects } from "../api/classRequests"
import { getStudentClass } from "../api/studentRequests"
import DashBoardStudentBarComponent from "../components/shared/DashBoardStudentBar"
import Loading from "../components/shared/Loading"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const StudentSubjectsScreen = () => {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getStudentSubjects = async () => {
            setLoading(true)
            let id = localStorage.getItem('userId')
            //Pegando a turma
            const resp = await getStudentClass(id)
            const subjects = await getAllClassSubjects(resp._id)
            setSubjects(subjects)
            setLoading(false)
        }
        async function fetchData() {
            await getStudentSubjects()
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
                            <h2>Lista de disciplinas</h2>
                            {subjects.map((value, index) => {
                                return (
                                    <Card key={index} style={{display:"flex", width:400, margin:10, alignItems:"center", justifyContent:"center"}}>
                                        <p>{value.subjectName}</p>
                                    </Card>
                                )
                            })}
                            {subjects.length === 0 && <h4>Nenhuma disciplina cadastrada na sua turma</h4>}
                        </DashBoardPage>
                    </DashBoardContainer>
                </>
            }
            {loading === true && <Loading />}
        </div>
    )
}

export default StudentSubjectsScreen