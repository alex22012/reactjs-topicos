import { Button, FormControl, InputLabel, Select, MenuItem, Card } from "@mui/material"
import React, {useState, useEffect} from "react"
import { useHistory } from "react-router"
import { getAllClasses } from "../api/classRequests"
import { getClassTeachers } from "../api/teachersRequests"
import DashBoardAdminBarComponent from "../components/shared/DashBoardAdminBar"
import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"

const TeachersScreen = () => {
    const [teachers, setTeachers] = useState([])
    const [classes, setClasses] = useState([])
    const [classId, setClassId] = useState("")
    const history = useHistory()
    const getTeachers = async (id) => {
        const resp = await getClassTeachers(id)
        setTeachers(resp)
    }
    useEffect(() => {
        const getClasses = async () => {
            const resp = await getAllClasses()
            if(resp.length > 0){
                setClasses(resp)
                getTeachers(resp[0]._id)
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
                <h2>Lista de professores</h2>
                <Button color="secondary" variant="contained" onClick={() => history.push("/dashboard/teachers/new-teacher")}>Novo professor</Button>
                <h3>Selecione a turma</h3>
                <FormControl>
                    <InputLabel>Turma</InputLabel>
                    <Select
                        id="select-turma-2"
                        style={{width:300}}
                        labelId="lbl-select-turma-2"
                        label="Turma"
                        value={`${classId}`}
                        onChange={e => {
                            setClassId(e.target.value)
                            getTeachers(e.target.value)
                        }}
                    >
                        {classes.map((value, index) => {
                            return (
                                <MenuItem key={index} value={value._id}>{value.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                {teachers.map((value, index) => {
                    return (
                        <Card style={{width:400, margin:10, padding:10}} key={index} onClick={() => history.push(`/dashboard/teacher/${value._id}/more-info`)}>
                            <p>{value.name}</p>
                        </Card>     
                    )
                })}
                {teachers.length === 0 && <h2>Essa turma não possui professores cadastrados</h2>}
            </DashBoardPage>
        </DashBoardContainer>
    )
}

export default TeachersScreen