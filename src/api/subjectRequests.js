let headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Accept", "application/json")
const base_url = "http://192.168.0.107:8080/"

export const getClassSubjects = async (classId) => {
    const resp = await fetch(base_url+`class/${classId}/subjects`, {
        method:'GET',
        headers
    })
    return resp.json()
}

export const getAllSubjectActivitys = async (subjectId) => {
    const resp = await fetch(base_url+`subject/${subjectId}/activitys`, {
        method:"GET",
        headers
    })
    return resp.json()
}

export const getAllSubjectPendingActivitys = async (subjectId) => {
    const resp = await fetch(base_url+`subject/${subjectId}/pending-activitys`, {
        method:"GET",
        headers
    })
    return resp.json()
}

export const postSubject = async (subjectName, classId) => {
    const resp = await fetch(base_url+"subject", {
        method:"POST",
        headers,
        body:JSON.stringify({subjectName, classId})
    })
    return resp.status
}