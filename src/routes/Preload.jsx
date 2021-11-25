import React, {useEffect} from "react"
import { useHistory } from "react-router"

const Preload = () => {
    const history = useHistory()
    useEffect(() => {
        const verificarLogin = async () => {
            //Remove os tokens e manda pro login pra segurança
            let id = localStorage.getItem("id")
            if(!id){
                //Faço um get nas 3 tabelas e vejo se existe um deles que tem esse id. Se não tiver, é falso
                history.push({
                    pathname:"/dashboard",
                    state: {role:"teacher"}
                })
            }
            else{
                history.push("/login")
            } 
                
        }
        async function fetchData() {
            await verificarLogin()
        }
        fetchData()
    }, [])
    return (
        <h1>Preload</h1>
    )
}

export default Preload