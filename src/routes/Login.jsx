import React, {useState} from "react"
import {Page, TextInput} from "../components/shared/styled"
import { useHistory } from "react-router"
import Swal from "sweetalert2"
import { Login } from "../api/studentRequests"
import md5 from "md5"
import { teacherLogin } from "../api/teachersRequests"
import { TextField, Button, Radio, RadioGroup, FormLabel, FormControl, FormControlLabel } from "@mui/material"
import { adminLogin } from "../api/adminRequests"
import Escola from "../images/ESCOLA.png"
import jwt from "jsonwebtoken"

const LoginScreen = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginMethod, setLoginMethod] = useState("admin")
    const gerateToken = async (email) => {
        jwt.sign({email}, "123abc456", {expiresIn:"1h"}, (err, token) => {
            if(!err)
                localStorage.setItem("token", token)
            else 
                console.log(err)
        })
    }
    const fazerLogin = async () => {
        console.log(loginMethod)
        if(loginMethod === "student"){
            const resp = await Login(email, password)
            if(resp) {
                await gerateToken()
                localStorage.setItem("userId", resp.student._id)
                localStorage.setItem(md5("role"), md5("student"))
                history.push("/dashboard")
            }else {
                alert("Login inválido")
            }
        }else if(loginMethod === "teacher"){
            const resp = await teacherLogin(email, password)
            const json = await resp.body
            if(resp.status === 200){
                //Logou
                localStorage.setItem("userId", json.teacher._id)
                localStorage.setItem(md5("role"), md5("teacher"))
                history.push("/dashboard")
            }else {
                alert("Dados incorretos")
            }
        }else {
            //Aqui loga como admin
            const resp = await adminLogin(email, password)
            console.log(resp)
            const json = await resp.body
            if(resp.status === 200){
                localStorage.setItem("userId", json.admin._id)
                localStorage.setItem(md5("role"), md5("admin"))
                history.push("/dashboard")
            }
        }
    }
    return (
        <Page>
            <h2>Entre com sua conta</h2>
            <img src={Escola} alt="Foto ficticia" width={400} height={200} style={{margin:10}} />
            <FormControl component="fieldset" >
                <FormLabel component="legend">Logar como</FormLabel>
                    <RadioGroup 
                        onChange={e => setLoginMethod(e.target.value)}
                        row
                        aria-label="Entrar como"
                        defaultValue="admin"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="student" control={<Radio />} label="Aluno" />
                        <FormControlLabel value="teacher" control={<Radio />} label="Professor" />
                    </RadioGroup>
            </FormControl>
                <TextField label="Email" style={{width:600}} type="email" variant="outlined" placeholder="Digite o email" onChange={e => setEmail(e.target.value)} margin="normal"/>
                <TextField label="Senha" style={{width:600}} type="email" variant="outlined" placeholder="Digite a senha" onChange={e => setPassword(e.target.value)} margin="normal" />
                <Button variant="contained" color="primary" onClick={() => fazerLogin()}>Entrar</Button>
        </Page>
    )
}

export default LoginScreen