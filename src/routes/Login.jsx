import React, {useState} from "react"
import {Page, Button, TextInput} from "../components/shared/styled"
import Swal from "sweetalert2"

const LoginScreen = () => {
    const fazerLogin = async () => {
        let cbAluno = document.getElementById("cbAluno")
        let cbProf = document.getElementById("cbProf")
        if(cbAluno.checked){
            //Loga como um aluno
        }else if(cbProf.checked){
            //Loga como professor
        }else {
            //Aqui loga como admin
        }
    }
    return (
        <Page>
            <h2>Entre com sua conta</h2>
            <img alt="Foto ficticia" width={300} height={150} />
                <div>
                    <label>Entrar como aluno</label>
                    <input id="cbAluno" type="radio" name="formaLogin"/>
                </div>
                <div>
                    <label>Entrar como professor</label>
                    <input id="cbProf" type="radio" name="formaLogin"/>
                </div>
                <TextInput type="email" placeholder="Digite seu email" />
                <TextInput type="password" placeholder="Digite sua senha" />
                <Button type="button" onClick={() => fazerLogin()} >Entrar</Button>
        </Page>
    )
}

export default LoginScreen