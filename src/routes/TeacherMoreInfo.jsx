import { Card } from "@mui/material"
import React, {useState, useEffect} from "react"
import { useParams } from "react-router"
import { getTeacher } from "../api/adminRequests"
import { getTeacherSubject } from "../api/teachersRequests"
import Loading from "../components/shared/Loading"

const TeacherMoreInfo = () => {
    const params = useParams()
    const [teacher, setTeacher] = useState({})
    const [subject, setSubject] = useState({})
    const [loading, setLoading] = useState(false)
    const getOneTeacher = async () => {
        const resp = await getTeacher(params.id)
        setTeacher(resp)
        setLoading(false)
    }
    useEffect(() => {
        const getSubject = async () => {
            setLoading(true)
            const resp = await getTeacherSubject(params.id)
            if(resp.length > 0){
                setSubject(resp[0])
                console.log(resp)
                await getOneTeacher()
            }
        }
        async function fetchData() {
            await getSubject()
        }
        fetchData()
    }, [])
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            {loading === false && 
                <>
                    <h2>Informações sobre o professor</h2>
                    <Card style={{width:500, padding:10}}>
                        <p>Nome: {teacher.name}</p>
                        <p>Data de nascimento: {new Date(teacher.birthDate).toLocaleDateString()}</p>
                        <p>Disciplinha: {subject.subjectName}</p>
                    </Card>
                </>
            }
            {loading === true && <Loading />}
        </div>
    )
}

export default TeacherMoreInfo