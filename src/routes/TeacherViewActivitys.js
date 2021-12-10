import { getStorage, ref, getDownloadURL } from "firebase/storage"
import React, { useEffect, useState } from "react"
import { getClassStudents } from "../api/studentRequests"
import { getAllSubjectPendingActivitys } from "../api/subjectRequests"
import { getTeacherClass, getTeacherSubject } from "../api/teachersRequests"
import app from "../storage/firebase"
import { Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material"
import Loading from "../components/shared/Loading"

const TeacherViewActivitys = () => {
    const [classId, setClassId] = useState(null)
    const [subjectId, setSubjectId] = useState(null)
    const [activitys, setActivitys] = useState([])
    const [students, setStudents] = useState([])
    const [studentId, setStudentId] = useState(null)
    const [activityId, setActivityId] = useState("")
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState(null)
    const getSubject = async (id) => {
        const resp = await getTeacherSubject(id)
        if(resp.length > 0){
            setSubjectId(resp[0]._id)
            await getActivitys(resp[0]._id)
        }
    }
    const getActivitys = async (id) => {
        const resp = await getAllSubjectPendingActivitys(id)
        if(resp.length > 0){
            setActivityId(resp[0]._id)
            setActivitys(resp)
            setLoading(false)
        }
        
    }
    const getStudents = async (id) => {
        const resp = await getClassStudents(id)
        if(resp.length > 0){
            console.log("Oi")
            setStudentId(resp[0]._id)
            setStudents(resp)
        }
    }
    const getActivity = async () => {
        let storage = getStorage(app, app.options.storageBucket)
        let storageRef = ref(storage, `${studentId}/${activityId}/activity`)
        getDownloadURL(storageRef)
        .then(url => {
            setUrl(url)
        }).catch(err => alert("Atividade não encontrada"))
    }
    useEffect(() => {
        const getClass = async () => {
            setLoading(true)
            let id = localStorage.getItem("userId")
            const resp = await getTeacherClass(id)
            setClassId(resp._id)
            console.log(resp._id)
            await getStudents(resp._id)
            await getSubject(id)
        }
        async function fetchData() {
            await getClass()
        }
        fetchData()
    }, [])
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            {loading === false && 
                <>
                    <h2>Lista de atividades dos estudantes</h2>
                    <div style={{display:"flex", flexDirection:"row", margin:10}}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Atividade</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={`${activityId}`}
                                label="Atividade"
                                onChange={e => {
                                    console.log(e.target.value)
                                    setActivityId(e.target.value)
                                }}
                            >
                                {activitys.map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={value._id}>{value.body}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label-2">Estudante</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-2"
                                id="demo-simple-select-2"
                                value={`${studentId}`}
                                label="Estudante"
                                onChange={e => {
                                    setStudentId(e.target.value)
                                }}
                            >
                                {students.map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={value._id}>{value.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Button style={{margin:10}} color="primary" variant="contained" onClick={() => getActivity()}>Buscar atividade</Button>
                    </div>
                    {url !== null && 
                        <div>
                            <iframe src={url} width={500} height={400} title="Atividade"></iframe>
                        </div>
                    }
                    {url === null && <span>Busque a atividade para ter uma visualização</span>}
                </>
            }
            {loading === true && <Loading />}
        </div>
    )
}

export default TeacherViewActivitys