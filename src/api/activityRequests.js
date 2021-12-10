let headers = new Headers()
headers.set("Content-Type", "application/json")
headers.set("Accept", "application/json")
const base_url = "http://192.168.0.107:8080/"

export const checkActivityConclusion = async (studentId, activityId) => {
    const resp = await fetch(base_url+`activity/check-conclusion`, {
        method:"POST",
        headers,
        body:JSON.stringify({studentId, activityId})
    })
    return resp.status
}