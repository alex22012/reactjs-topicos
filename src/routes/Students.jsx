import React, {useState, useEffect} from "react"
import DashBoardAdminBarComponent from "../components/shared/DashBoardAdminBar"
import { useHistory } from "react-router"
import { getClassStudents } from "../api/studentRequests"

import { DashBoardContainer, DashBoardPage } from "../components/shared/styled"
import { getAllClasses } from "../api/classRequests"
import Loading from "../components/shared/Loading"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const StudentScreen = () => {
    const history = useHistory()
    const [classes, setClasses] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [classId, setClassId] = useState("")
    const getStudents = async (id) => {
        //Pego os estudante da turma do id
        const resp = await getClassStudents(id)
        setStudents(resp)
        setLoading(false)
    }
    useEffect(() => {
        const getClasses = async () => {
            setLoading(true)
            const resp = await getAllClasses()
            if(resp.length > 0){
                setClasses(resp)
                getStudents(resp[0]._id)
            }else 
                setClasses([])
        }
        async function fetchData() {
            await getClasses()
        }   
        fetchData()
    }, [])
    return (
        <div>
            {loading === false &&
            <DashBoardContainer>
                <DashBoardAdminBarComponent selectedComponet={"students"}/>
                <DashBoardPage>
                    <h2>Lista de estudantes</h2>
                    <Button color="secondary" variant="contained" onClick={() => history.push("/dashboard/students/new-student")}>Novo estudante</Button>
                    <h3>Selecione a turma</h3>
                    <FormControl>
                        <InputLabel>Turma</InputLabel>
                        <Select
                            style={{width:300}}
                            id="select-alunos"
                            labelId="lbl-select-alunos"
                            value={`${classId}`}
                            label="Turma"
                            onChange={e => {
                                setClassId(e.target.value)
                                getStudents(e.target.value)
                            }}
                        >
                            {classes.map((value, index) => {
                                return (
                                    <MenuItem key={index} value={value._id}>{value.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    {students.map((value, index) => {
                        return (
                            <p key={index} onClick={() => {
                                history.push(`/dashboard/student/${value._id}/more-info`)
                            }}>{value.name}</p>
                        )
                    })}
                    {students.length === 0 && <h2>Essa turma não possui estudantes cadastrados</h2>}
                </DashBoardPage>
            </DashBoardContainer>}
            {loading === true && <Loading />}
        </div>
    )
}

export default StudentScreen

/** */