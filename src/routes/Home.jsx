import md5 from "md5"
import React, {useState, useEffect} from "react"
import { useLocation } from "react-router"
import AdminComponent from "../components/AdminComponent"
import StudentComponent from "../components/StudentComponent"
import TeacherComponent from "../components/TeacherComponent"

const HomeScreen = (props) => {
    const [role, setRole] = useState(false)
    const location = useLocation()
    useEffect(() => {
        function fetchData() {
            let role = localStorage.getItem(md5("role"))
            if(role === md5("admin"))
                setRole("admin")
            else if (role === md5("teacher"))
                setRole("teacher")
            else 
                setRole("student")
        }
        fetchData()
    }, [])
    //Aqui eu verifico se o cara é adm, professor ou aluno e renderizo o componente certo
    return (
        <div>  
            {role === "admin" &&
                <AdminComponent />
            }
            {role === "teacher" && 
                <TeacherComponent />
            }
            {role === "student" && 
                <StudentComponent />
            }
        </div>
    )
}

export default HomeScreen