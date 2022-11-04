import { register } from "./requests.js"

async function createUser () {
    const formRegister = document.querySelector('.register-form')
    const formElements = [...formRegister]
    const professionalLevel = document.querySelector('.select-professional-level')
    

    formRegister.addEventListener('submit', async (iten) => {
        iten.preventDefault()

        const body = {}

        formElements.forEach(element =>  {

            if(element.tagName === "INPUT" && element.value !== "") {
                body[element.id] = element.value
            }
        })

        body[professionalLevel.id] = professionalLevel.value
        
        if(body.professional_level === "title-select") {
            body.professional_level = null
        }
        
        await register(body)
    })
}

createUser()