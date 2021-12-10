import { TextField } from "@mui/material"
import React, {useState} from "react"
import { postClass } from "../api/classRequests"
import { Button } from "@mui/material"

const NewClassScreen = () => {
    const [name, setName] = useState("")
    const [grade, setGrade] = useState("")
    const newClass = async () => {
        const status = await postClass(name, grade)
        if(status == 201){
            alert("Turma inserida com sucesso")
        }
    }
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <h1>Nova turma</h1>
            <TextField style={{width:400, margin:10}} label="Nome da turma" type="text" color="primary" variant="outlined" placeholder="Digite o nome da turma" onChange={e => setName(e.target.value)} />
            <TextField style={{width:400, margin:10}} label="Ano da turma" color="primary" type="text" variant="outlined" placeholder="Digite o ano da turma" onChange={e => setGrade(e.target.value)} />
            <Button color="primary" variant="contained" onClick={() => newClass()}>Criar turma</Button>
        </div>
    )
}

export default NewClassScreen