import React, {useState, useEffect} from "react"
import { useLocation } from "react-router"
import AdminComponent from "../components/AdminComponent"
import StudentComponent from "../components/StudentComponent"
import TeacherComponent from "../components/TeacherComponent"

const HomeScreen = (props) => {
    const [isStudent, setIsStudent] = useState(false)
    const location = useLocation()
    useEffect(() => {
        function fetchData() {
            if(location.state === undefined)
                setIsStudent(true)
        }
        fetchData()
    }, [])
    //Aqui eu verifico se o cara é adm, professor ou aluno e renderizo o componente certo
    return (
        <div>  
            {location.state.role === "admin" &&
                <AdminComponent />
            }
            {location.state.role === "teacher" && 
                <TeacherComponent />
            }
            {location.state.role === "student" && 
                <StudentComponent />
            }
        </div>
    )
}

export default HomeScreen