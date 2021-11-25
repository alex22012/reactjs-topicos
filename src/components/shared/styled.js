import styled from "styled-components";

export const Page = styled.div`
    display:flex;
    flex-direction:column;
    padding:5px;
    align-items:center;
`

export const TextInput = styled.input`
    width:200px;
    height:40px;
    border-radius:5px;
    margin-bottom:20px;
`

export const Button = styled.button`
    width:100px;
    height:40px;
    border-radius:3px;
    background-color:${props => props.bgColor};
    border: 1px solid ${props => props.borderColor}
`

export const DashBoardBar = styled.div`
    display:flex;
    width:20%;
    flex-direction:column;
    border:1px solid red;
`

export const DashBoardItem = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#ff0000;
    height:50px;
    border:1px solid #ff0000;
    margin-bottom:5px;
    cursor:pointer;
    &:hover {
        color:#ffffff;
        background-color:#ff0000;
    }
`

export const DashBoardPage = styled.div`
    width:75%;
    display:flex;
    margin-left:20px;
    align-items:center;
    flex-direction:column;
    border:1px solid black;
`

export const DashBoardContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
`