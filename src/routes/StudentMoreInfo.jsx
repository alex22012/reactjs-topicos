import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getStudent } from "../api/adminRequests"
import { getStudentClass, getStudentSubjectGrades } from "../api/studentRequests"
import { getClassSubjects } from "../api/subjectRequests"
import Loading from "../components/shared/Loading"

const StudentMoreInfo = () => {
    const [student, setStudent] = useState({})
    const [subjects, setSubjects] = useState([])
    const [grades, setGrades] = useState([])
    const [loading, setLoading] = useState(false)
    const getOneStudent = async () => {
        const resp = await getStudent(params.id)
        setStudent(resp)
        setLoading(false)
    }
    const getSubjects = async (id) => {
        const resp = await getClassSubjects(id)
        if(resp.length > 0){
            await getGrades(resp[0]._id)
        }
        setSubjects(resp)
        await getOneStudent()
    }
    const getGrades = async (subjectId) => {
        const resp = await getStudentSubjectGrades(params.id, subjectId)
        setGrades(resp)
    }
    useEffect(() => {
        const getClassId = async () => {
            setLoading(true)
            const resp = await getStudentClass(params.id)
            await getSubjects(resp._id)
        }
        async function fetchData() {
            await getClassId()
        }
        fetchData()
    }, [])
    const params = useParams()
    return (
        <div>
            {loading === false && 
                <>
                    <h2>Informações sobre o estudante</h2>
                    <div>
                        <h4>Nome: {student.name}</h4>
                        <h4>Matrícula: {student.enrollment}</h4>
                        <h4>Data de nascimento: {student.birthDate}</h4>
                    </div>
                    <h2>Notas do estudante</h2>
                    <span>Selecione a disciplina</span>
                    <select onChange={e => getGrades(e.target.value)}>
                        {subjects.map((value, index) => {
                            return <option value={value._id} key={index}>{value.subjectName}</option>
                        })}
                    </select>
                    {grades.length === 0 && <h4>Nenhuma nota cadastrada</h4>}
                    {grades.map((value, index) => {
                        return <p key={index}>Atividade {index+1}: {value.grade}</p>
                    })}
                </>
            }  
            {loading === true && <Loading />}
        </div>
    )
}

export default StudentMoreInfo