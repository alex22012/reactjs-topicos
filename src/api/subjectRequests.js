let headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Accept", "application/json")
const base_url = "http://localhost:8080/"

export const getAllSubjects = async () => {
    const resp = await fetch(base_url+"subjects", {
        method:'GET',
        headers
    })
    return resp.json()
}