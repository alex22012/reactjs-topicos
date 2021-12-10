let headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Accept", "application/json")
const base_url = "http://192.168.0.107:8080/"

export const adminLogin = async (email, password) => {
    const resp = await fetch(base_url+"admin/login", {
        method:'POST',
        headers,
        body:JSON.stringify({email, password})
    })
    return {status:resp.status, body:resp.json()}
}

export const getStudent = async (id) => {
    const resp = await fetch(base_url+`student/${id}`, {
        method:'GET',
        headers
    })
    return resp.json()
}

export const getTeacher = async (id) => {
    const resp = await fetch(base_url+`teacher/${id}`, {
        method:"GET",
        headers
    })
    return resp.json()
}