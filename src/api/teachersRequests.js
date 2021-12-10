import { newEmail, randomPassword } from "./functions"

let headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Accept", "application/json")
const base_url = "http://192.168.0.107:8080/"

export const getClassTeachers = async (classId) => {
    const resp = await fetch(base_url+`class/${classId}/teachers`, {
        method:'GET',
        headers
    })
    return resp.json()
}

export const getTeacherClass = async(teacherId) => {
    const resp = await fetch(base_url+`teacher/${teacherId}/class`, {
        method:"GET",
        headers
    })
    return resp.json()
}

export const getTeacherSubject = async(teacherId) => {
    const resp = await fetch(base_url+`teacher/${teacherId}/subject`, {
        method:"GET",
        headers
    })
    return resp.json()
}

export const postTeacher = async (name, birthDate, classId, subjectId) => {
    let email = newEmail(name)
    let password = randomPassword()
    const resp = await fetch(base_url+"teacher", {
        method:"POST",
        headers,
        body:JSON.stringify({name, birthDate, classId, subjectId, email, password})
    })
    return {email, password, status:resp.status}
}

export const postActivity = async (classId, body, subjectId, startDate, endDate, isTest, isCorrected) => {
    const resp = await fetch(base_url+"activity", {
        method:"POST",
        headers,
        body:JSON.stringify({classId, body, subjectId, startDate, endDate, isTest, isCorrected})
    })
    return resp.status
}

export const postGrade = async (grade, studentId, subjectId, activityId, activityName) => {
    const resp = await fetch(base_url+"grade", {
        method:"POST",
        headers,
        body:JSON.stringify({grade, studentId, subjectId, activityId, activityName})
    })
    return resp.status
}

export const updateActivity = async (activityId) => {
    const resp = await fetch(base_url+`activity/${activityId}`, {
        method:"PUT",
        headers,
        body:JSON.stringify({isCorrected:true})
    })
    return resp.status
}

export const teacherLogin = async (email, password) => {
    const resp = await fetch(base_url+"teacher/login", {
        method:"POST",
        headers,
        body:JSON.stringify({email, password})
    })
    return {status:resp.status, body:resp.json()}
}
