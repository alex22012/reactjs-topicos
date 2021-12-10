import React, {useState, useEffect} from "react"
import { getClassSubjects } from "../api/subjectRequests"
import { useHistory } from "react-router"
import DashBoardAdminBarComponent from "../components/shared/DashBoardAdminBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"
import { getAllClasses } from "../api/classRequests"
import { Button, FormControl, InputLabel, Select, MenuItem, Card} from "@mui/material"

const SubjectsScreen = () => {
    const [subjects, setSubjects] = useState([])
    const [classes, setClasses] = useState([])
    const [classId, setClassId] = useState("")
    const history = useHistory()
    const getSubjects = async (id) => {
        //Pego as subjects da turma id
        const resp = await getClassSubjects(id)
        setSubjects(resp)
    }
    useEffect(() => {
        const getClasses = async () => {
            const resp = await getAllClasses()
            if(resp.length > 0){
                setClasses(resp)
                getSubjects(resp[0]._id)
            }else 
                setClasses([])
        }
        async function fetchData() {
            await getClasses()
        }   
        fetchData()
    }, [])
    return (
        <DashBoardContainer>
            <DashBoardAdminBarComponent />
            <DashBoardPage>
                <h2>Lista de disciplinas</h2>
                <Button color="secondary" variant="contained" onClick={() => history.push("/dashboard/subjects/new-subject")}>Nova disciplina</Button>
                <h3>Selecione a turma</h3>
                <FormControl>
                    <InputLabel>Turma</InputLabel>
                    <Select
                        id="select-turma-1"
                        labelId="lbl-select-turma-1"
                        style={{width:300}}
                        value={`${classId}`}
                        label="Turma"
                        onChange={e => {
                            setClassId(e.target.value)
                            getSubjects(e.target.value)
                        }}
                    >
                        {classes.map((value, index) => {
                            return (
                                <MenuItem key={index} value={value._id}>{value.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                {subjects.map((value, index) => {
                    return (
                        <Card key={index} style={{width:400, padding:10, margin:10}}>
                            <p>{value.subjectName}</p>
                        </Card>
                    )
                })}
                {subjects.length === 0 && <h2>Essa turma não tem disciplinas cadastradas</h2>}
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default SubjectsScreen