import { login } from "./requests.js";

function userLogin () {

    const formLogin = document.querySelector('.form-login')
    const formElements = [...formLogin]

    formLogin.addEventListener('submit', async (iten) => {
        iten.preventDefault()

        const body = {}

        formElements.forEach(element => {

            if(element.tagName === "INPUT" && element.value !== "") {
                body[element.id] = element.value
            }
        })

        await login(body)
    })
}

userLogin()