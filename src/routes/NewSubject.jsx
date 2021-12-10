import React, {useState, useEffect} from "react"
import { getAllClasses } from "../api/classRequests"
import { postSubject } from "../api/subjectRequests"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

const NewSubject = () => {
    const [classes, setClasses] = useState([])
    const [classId, setClassId] = useState(null)
    const [subjectName, setSubjectName] = useState("")
    const newSubject = async () => {
        const status = await postSubject(subjectName, classId)
        if(status == 201)
            alert("Disciplina inserida com sucesso")
    }
    useEffect(() => {
        const getClasses = async() => {
            const resp = await getAllClasses()
            if(resp.length > 0)
                setClassId(resp[0]._id)
            setClasses(resp)
        }   
        async function fetchData() {
            await getClasses()
        }
        fetchData()
    }, [])
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <h2>Nova disciplina</h2>
            <FormControl>
                <InputLabel>Turma</InputLabel>
                <Select
                    id="select-turma-3"
                    labelId="lbl-select-turma-3"
                    label="Turma"
                    value={`${classId}`}
                    style={{width:300}}
                    onChange={e => setClassId(e.target.value)}
                >
                    {classes.map((value, index) => {
                        return(
                            <MenuItem key={index} value={value._id}>{value.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <h3>Informe os dados da disciplina</h3>
            <TextField label="Nome da disciplina" style={{width:400, margin:10}} type="text" onChange={e => setSubjectName(e.target.value)} placeholder="Digite o nome da disciplina" />
            <Button color="primary" variant="contained" onClick={() => newSubject()}>Cadastrar</Button>
        </div>
    )
}

export default NewSubject