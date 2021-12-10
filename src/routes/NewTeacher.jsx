import React, {useState, useEffect} from "react"
import { MenuItem, InputLabel, FormControl, Select, TextField, Button } from "@mui/material"
import { getAllClasses, getAllClassSubjects } from "../api/classRequests"
import { postTeacher } from "../api/teachersRequests"
import Swal from "sweetalert2"

const NewTeacher = () => {
    const [classSubjects, setClassSubjects] = useState([])
    const [classes, setClasses] = useState([])
    const [classId, setClassId] = useState(null)
    const [subjectId, setSubjectId] = useState(null)
    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState(null)
    const getClassSubjects = async (id) => {
        const resp = await getAllClassSubjects(id)
        if(resp.length > 0){
            setSubjectId(resp[0]._id)
            setClassSubjects(resp)
        }else 
            setClassSubjects([])
    }
    const newTeacher = async () => {
        const resp = await postTeacher(name, birthDate, classId, subjectId)
        if(resp.status === 201)
            Swal.fire({
                title:"Cadastro efetuado com sucesso",
                html:`O email do professor é ${resp.email} e a senha é ${resp.password}`,
                icon:"success"
            })
    }
    useEffect(() => {
        const getClasses = async () => {
            const resp = await getAllClasses()
            setClasses(resp)
            setClassId(resp[0]._id)
            getClassSubjects(resp[0]._id)
        }
        async function fetchData() {
            await getClasses()
        }
        fetchData()
    }, [])
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <h1>Novo professor</h1>
            <h3>Selecione a turma</h3>
            <FormControl>
                <InputLabel>Turma</InputLabel>
                <Select
                    id="select-turma-4"
                    labelId="lbl-select-turma-4"
                    label="Turma"
                    value={`${classId}`}
                    onChange={e => {
                        setClassId(e.target.value)
                        getClassSubjects(e.target.value)
                    }}
                    style={{width:300}}
                >
                    {classes.map((value, index) => {
                        return (
                            <MenuItem key={index} value={value._id}>{value.name}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <h4>Selecione a disciplina do professor</h4>
            <FormControl>
                <InputLabel>Disciplina</InputLabel>
                <Select
                    id="select-subject"
                    labelId="lbl-select-subject"
                    label="Disciplina"
                    style={{width:300}}
                    value={`${subjectId}`}
                    onChange={e => setSubjectId(e.target.value)}
                >
                    {classSubjects.map((value, index) => {
                        return (
                            <MenuItem key={index} value={value._id}>{value.subjectName}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <h4>Informe os dados do professor</h4>
            <TextField style={{width:300, margin:5}} label="Nome" variant="outlined" color="primary" type="text" placeholder="Digite o nome do professor" onChange={e => setName(e.target.value)} />
            <TextField style={{width:300, margin:5}} variant="outlined" color="primary" type="date" placeholder="Informe a data de nascimento" onChange={e => setBirthDate(new Date(e.target.value))} />
            <Button style={{margin:10}} color="primary" variant="contained" onClick={() => newTeacher()}>Cadastrar</Button>
        </div>
    )
}

export default NewTeacher

//Class id, subject id
//Primeiro pega o class id e dependendo o class id eu pego os subjects