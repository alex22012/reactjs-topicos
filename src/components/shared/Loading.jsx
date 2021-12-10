import { CircularProgress } from "@mui/material"
import React from "react"

const Loading = () => {
    return (
        <div style={{display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"center"}}>
            <CircularProgress style={{width:100, height:100}} />
            <h4>Carregando</h4>
        </div>
    )
}

export default Loading