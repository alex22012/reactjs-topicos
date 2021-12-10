import { TextField, FormControlLabel, FormControl, Radio, FormLabel, RadioGroup, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getTeacherClass, getTeacherSubject, postActivity } from "../api/teachersRequests"
import DashBoardTeacherBarComponent from "../components/shared/DashBoardTeacherBarComponent"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const TeacherNewActivityScreen = () => {
    const [activityBody, setActivityBody] = useState("")
    const [endDate, setEndDate] = useState("")
    const [classId, setClassId] = useState(null)
    const [subjectId, setSubjectId] = useState(null)
    const [typeOfTest, setTypeOfTest] = useState("trabalho")
    const getSubject = async(teacherId) => {
        const resp = await getTeacherSubject(teacherId)
        console.log(resp)
        if(resp.length > 0){
            setSubjectId(resp[0]._id)
        }
    }
    const newActivity = async () => {
        let type = undefined
        if(typeOfTest === "trabalho")
            type = false
        else 
            type = true
        const status = await postActivity(classId, activityBody, subjectId, new Date(), endDate, type, false)
        if(status === 201)
            Swal.fire({
                title:"Enviado com sucesso",
                html:"A atividade foi cadastrada com sucesso no sistema!",
                icon:"success",
                showConfirmButton:true,
            })
    }
    useEffect(() => {
        const getClass = async() => {
            let id = localStorage.getItem("userId")
            const resp = await getTeacherClass(id)
            console.log(resp)
            if(resp !== undefined && resp !== null){
                setClassId(resp._id)
                await getSubject(id)
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
                <h2>Cadastre uma tarefa</h2>
                <label>Descrição da tarefa</label>
                <TextField style={{width:400, margin:10}} multiline color="primary" variant="outlined" label="Tarefa" placeholder="Digite a tarefa" onChange={e => setActivityBody(e.target.value)}/>
                <label>Data para entrega</label>
                <TextField style={{width:400, margin:10}} type="date" variant="outlined" color="primary" onChange={e => setEndDate(new Date(e.target.value))}/>
                <FormControl component="fieldset" >
                    <FormLabel component="legend">Tipo de atividade</FormLabel>
                    <RadioGroup 
                        onChange={e => setTypeOfTest(e.target.value)}
                        row
                        aria-label="Tipo de atividade"
                        defaultValue="trabalho"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="prova" control={<Radio />} label="Prova" />
                        <FormControlLabel value="trabalho" control={<Radio />} label="Trabalho" />
                    </RadioGroup>
                </FormControl>
                <Button style={{margin:10}} onClick={() => newActivity()} color="primary" variant="contained">Cadastrar</Button>
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default TeacherNewActivityScreen