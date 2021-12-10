import React, {useEffect, useState} from "react";
import { getClassStudents } from "../api/studentRequests";
import { getTeacherClass, postGrade, updateActivity } from "../api/teachersRequests";
import DashBoardTeacherBarComponent from "../components/shared/DashBoardTeacherBarComponent";
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled";
import { useHistory } from "react-router";

const TeacherNewGrade = () => {
    const history = useHistory()
    const [students, setStudents] = useState([])
    const [countStudents, setCountStudents] = useState(0)
    const [studentId, setStudentId] = useState(null)
    const [grade, setGrade] = useState("")
    const getStudents = async (classId) => {
        const resp = await getClassStudents(classId)
        if(resp.length > 0){
            setCountStudents(resp.length)
            setStudents(resp)
            setStudentId(resp[0]._id)
        }
    }
    const newGrade = async () => {
        let subjectId = localStorage.getItem("subjectId")
        let activityId = localStorage.getItem("activityId")
        let activityName = localStorage.getItem('activityName')
        const status = await postGrade(grade, studentId, subjectId, activityId, activityName)
        if(status === 201){
            alert("Nota lançada com sucesso")
            //Limpo o campo de nota
            setGrade("")
            //Removo o aluno da lista
            students.shift()
            setCountStudents(countStudents - 1)
            setStudents(students)
            if(students.length > 0){
                setStudentId(students[0]._id)
            }
            console.log(countStudents)
            if(countStudents <= 1){
                await correctActivity()
            }
        }else {
            alert("Errooo!!")
        }
    }
    const correctActivity = async () => {
        let activityId = localStorage.getItem("activityId")
        const status = await updateActivity(activityId)
        if(status === 204)
            history.push("/dashboard")
    }
    useEffect(() => {
        const getClass = async () => {
            let id = localStorage.getItem("userId")
            const resp = await getTeacherClass(id)
            if(resp !== undefined) {
                await getStudents(resp._id)
            }
        }
        async function fetchData() {
            await getClass()
        }
        fetchData()
    }, [])
    return (
        <DashBoardContainer>
            <DashBoardTeacherBarComponent />
            <DashBoardPage>
                <h2>Cadastrar notas para estudantes</h2>
                <div>
                    <select onChange={e => setStudentId(e.target.value)}>
                        {students.map((value, index) => {
                            return <option key={index} value={value._id}>{value.name}</option>
                        })}
                    </select>
                    <input type="number" value={grade} placeholder="Insira a nota do aluno" onChange={e => setGrade(e.target.value)}/>
                    <button onClick={() => newGrade()}>Lançar nota</button>
                </div>
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default TeacherNewGrade