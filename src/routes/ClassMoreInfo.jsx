import { Card, CardContent } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"
import { getClassStudents } from "../api/studentRequests"
import Loading from "../components/shared/Loading"

const ClassMoreInfo = () => {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getStudents = async () => {
            setLoading(true)
            const resp = await getClassStudents(params.id)
            setStudents(resp)
            setLoading(false)
        }
        async function fetchData() {
            await getStudents()
        }
        fetchData()
    }, [])
    const params = useParams()
    const history = useHistory()
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            {loading === false && 
                <>
                    <h2>Lista de estudantes da turma</h2>
                    {students.length === 0 && <h4>Nenhum estudante nessa turma</h4>}
                    {students.map((value, index) => {
                        return (
                            <Card style={{width:500, margin:10, padding:10}} key={index} onClick={() => history.push(`/dashboard/student/${value._id}/more-info`)}>
                                <p>{value.name}</p>
                            </Card>
                        )
                    })}
                </>
            }
            {loading === true && <Loading />}
        </div>
    )
}

export default ClassMoreInfo