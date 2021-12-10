
export const randomPassword = () => {
    let string = ""
    let digitos = [newDigit(), newDigit(), newDigit(), newDigit(), newDigit(), newDigit(), newDigit(), newDigit()]
    digitos.forEach(value => {
        string += value
    })
    return string
}

export const newEmail = (name) => {
    let newName = name.replace(" ", "_")
    return newName+"@escoladotrabalho.com"
}

function newDigit() {
    return Math.round(Math.random()*9).toString()
}