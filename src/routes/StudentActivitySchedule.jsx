import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { getOneActivity, finishActivity } from "../api/studentRequests";
import app from "../storage/firebase"
import {getStorage, ref, uploadBytes} from "firebase/storage"
import { checkActivityConclusion } from "../api/activityRequests";
import { Button, Card, TextField } from "@mui/material";

const StudentActivitySchedule = () => {
    const [activity, setActivity] = useState({})
    const [file, setFile] = useState("")
    const [itsDone, setItsDone] = useState(false)
    const changeFile = (e) => {
        setFile(new Blob([e.target.files[0]], {type:"application/pdf"}))
    }
    const postActivity = () => {
        let id = localStorage.getItem("userId")
        let activityId = activity._id
        let storage = getStorage(app, app.options.storageBucket)
        let storageRef = ref(storage, `${id}/${activityId}/activity`)
        uploadBytes(storageRef, file, {contentType:"application/pdf"})
        .then(() => {
            finishActivity(activityId, id, new Date())
            .then(status => {
                if(status === 201){
                    alert("Atividade enviada com sucesso")
                }
            })
        }).catch(err => console.log(err))
    }
    const checkConclusion = async (actId) => {
        let id = localStorage.getItem("userId")
        console.log(id, actId)
        const status = await checkActivityConclusion(id, actId)
        console.log(status)
        if(status !== 204){
            setItsDone(true)
        }
    }
    useEffect(() => {
        const getActivity = async () => {
            const resp = await getOneActivity(params.id)
            setActivity(resp)
            await checkConclusion(resp._id)
        }
        async function fetchData() {
            await getActivity()
        }   
        fetchData()
    }, [])
    const params = useParams()
    let dataInicio = new Date(activity.startDate).toLocaleDateString()
    let dataFim = new Date(activity.endDate).toLocaleDateString()
    let prazo = Math.round((new Date(activity.endDate).getTime() - new Date().getTime()) / 1000 / 60 /60 / 24)
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <h2>Atividade</h2>
            <Card style={{padding:10, width:600}}>
                <p>Conteúdo: {activity.body}</p>
                <p>Data de início: {dataInicio}</p>
                <p>Data de fim: {dataFim}</p>
                <p>Prazo: {prazo} dias</p>
                <h4>Envie sua atividade aqui</h4>
                {!itsDone && prazo >= 0 && <>
                <TextField type="file" accept="application/pdf" helperText={file === "" ? "Insira um arquivo PDF":"Arquivo inserido"} onChange={e => changeFile(e)}/>
                <Button onClick={() => postActivity()} color="primary" variant="contained" style={{margin:10}}>Enviar atividade</Button>
            </>}
            </Card>
            {itsDone && <h4>Você ja concluiu essa atividade</h4>}
            {prazo < 0 && <h4>Atividade já encerrada</h4>}
        </div>
    )
}

export default StudentActivitySchedule