import styled from "styled-components";

export const Page = styled.div`
    display:flex;
    flex-direction:column;
    padding:5px;
    align-items:center;
`

export const TextInput = styled.input`
    width:50%;
    height:40px;
    border-radius:5px;
    border-color:#000000;
    margin-top:10px;
    margin-bottom:10px;
`

export const Button = styled.button`
    width:100px;
    height:40px;
    border-radius:3px;
    border: 1px solid ${props => props.borderColor};
    &:hover {
        background-color:${props => props.borderColor};
        cursor:pointer;
        color:#fff;
    }
`

export const DashBoardBar = styled.div`
    display:flex;
    width:20%;
    flex-direction:column;
`

export const DashBoardItem = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:grey;
    height:50px;
    border:1px solid grey;
    margin-bottom:5px;
    cursor:pointer;
    &:hover {
        color:#fff;
        background-color:grey;
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