import React, { useEffect, useState } from "react"
import { getAllClasses } from "../api/classRequests"
import { postStudent } from "../api/studentRequests"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

const NewStudent = () => {
    const [classes, setClasses] = useState([])
    const [classId, setClassId] = useState(null)
    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState(null)
    const newStudent = async () => {
        const resp = await postStudent(name, birthDate, classId)
        if(resp.status == 201){
            alert(`O email do estudante é ${resp.email} e a senha é ${resp.password}`)
        }
    }
    useEffect(() => {
        const getClasses = async () => {
            const resp = await getAllClasses()
            if(resp.length > 0){
                setClasses(resp)
                setClassId(resp[0]._id)
            }else 
                setClasses(resp)
        }
        async function fetchData() {
            await getClasses()
        }
        fetchData()
    }, [])
    return (
        <div style={{display:"flex", flexDirection:'column', alignItems:"center", justifyContent:'center'}}>
            <h2>Novo aluno</h2>
            <h3>Selecione a turma que deseja inserir o aluno</h3>
            <FormControl>
                <InputLabel>Turma</InputLabel>
                <Select
                    id="select-turma"
                    labelId="lbl-select-turma"
                    style={{width:300}}
                    value={`${classId}`}
                    label="Turma"
                    onChange={e => setClassId(e.target.value)}
                >
                    {classes.map((value, index) => {
                        return (
                            <MenuItem value={value._id} key={index}>{value.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <h3>Informe os dados do aluno</h3>
            <TextField label="Nome do aluno" style={{width:400, margin:10}} type="text" placeholder="Informe o nome do aluno" onChange={e => setName(e.target.value)} />
            <span>Informe a data de nascimento do aluno</span>
            <TextField style={{width:400, margin:10}} type="date" placeholder="Informe a data de nascimento do aluno" onChange={e => setBirthDate(new Date(e.target.value))} />
            <Button color="primary" variant="contained" onClick={() => newStudent()}>Cadastrar</Button>
        </div>
    )
}

export default NewStudent