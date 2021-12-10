let headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Accept", "application/json")
const base_url = "http://192.168.0.107:8080/"

export const getAllClasses = async () => {
    const resp = await fetch(base_url+"classes", {
        method:"GET",
        headers
    })
    return resp.json()
}

export const getAllClassSubjects = async(classId) => {
    const resp = await fetch(base_url+`class/${classId}/subjects`, {
        method:"GET",
        headers
    })
    return resp.json()
}

export const getAllClassActivitys = async(classId) => {
    const resp = await fetch(base_url+`class/${classId}/activitys`, {
        method:"GET",
        headers
    })
    return resp.json()
}

export const postClass = async (name, grade) => {
    const resp = await fetch(base_url+"class",{
        method:"POST",
        headers,
        body:JSON.stringify({name, grade})
    })
    return resp.status
}