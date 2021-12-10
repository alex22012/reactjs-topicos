import md5 from "md5"
import { newEmail, randomEnrollment, randomPassword } from "./functions"

let headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Accept", "application/json")
const base_url = "http://192.168.0.107:8080/"

export const getClassStudents = async (classId) => {
    const resp = await fetch(base_url+`class/${classId}/students`, {
        method:"GET",
        headers,
    })
    return resp.json()
}

export const getAllStudentGrades = async(studentId) => {
    const resp = await fetch(base_url+`student/${studentId}/grades`,{
        method:"GET",
        headers
    })
    return resp.json()
}

export const getStudentSubjectGrades = async (studentId, subjectId) => {
    const resp = await fetch(base_url+`student/${studentId}/subject/${subjectId}/grades`, {
        method:"GET",
        headers
    })
    return resp.json()
}

export const getOneActivity = async (activityId) => {
    const resp = await fetch(base_url+`activity/${activityId}`, {
        method:'GET',
        headers
    })
    return resp.json()
}

export const postStudent = async (name, birthDate, classId) => {
    //name, birthDate, email, password, classId, enrollment
    //Gero email no formato name@escolatal.com, senha e matricula aleatoria
    let email = newEmail(name)
    let enrollment = Math.round(Math.random() * 98521)
    let password = randomPassword()
    const resp = await fetch(base_url+"student", {
        method:"POST",
        headers,
        body:JSON.stringify({name, birthDate, email, password, classId, enrollment})
    })
    return {email, password, status:resp.status}
}

export const finishActivity = async (activityId, studentId, date) => {
    const resp = await fetch(base_url+"student/finish-activity",{
        method:"POST",
        headers,
        body:JSON.stringify({activityId,studentId, date})
    })
    return resp.status
}

export const Login = async (email, password) => {
    const resp = await fetch(base_url+"student/login", {
        method:"POST",
        headers,
        body:JSON.stringify({email, password})
    })
    return resp.json()
}

export const getStudentClass = async (_id) => {
    const resp = await fetch(base_url+`student/${_id}/class`,{
        method:"GET",
        headers
    })
    return resp.json()
}
