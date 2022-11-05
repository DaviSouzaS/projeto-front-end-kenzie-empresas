import { getLocalStorage } from "./localStorage.js"

const baseURL = 'http://localhost:6278'

async function getSectors () {

    try {
        const request = await fetch(`${baseURL}/sectors`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
    }

}

getSectors()

async function getCompanies () {

    try {
        const request = await fetch(`${baseURL}/companies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
    }

}

getCompanies()

async function getCompaniesBySector (sector){

    try {
        const request = await fetch(`${baseURL}/companies/${sector}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
    }
    
}

async function register(body) {

    try {
        const request = await fetch(`${baseURL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        console.log(request)

        if (request.ok === true) {
            console.log('CADASTRO BEM-SUCEDIDO')

            setTimeout(() => {
                window.location.replace('/src/pages/loginPage/index.html')
            }, 2000);
        }
        
        else {
            console.log('CADASTRO NÃO REALIZADO')
        }
    }
    catch (err) {
    }
}

async function login (body) {
    try {
        const request = await fetch(`${baseURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (request.ok === true) {

            console.log('LOGIN FEITO COM SUCESSO')

            const response = await request.json()
            console.log(response)
            localStorage.setItem("token", JSON.stringify(response))

            const validateUser = await checkUserType()
            
            if (validateUser.is_admin === true) {
                setTimeout(() => {
                    window.location.replace('/src/pages/adminPage/index.html')
                }, 2000);
            }
            else {
                setTimeout(() => {
                    window.location.replace('/src/pages/userPage/index.html')
                }, 2000);
            }
        }
        else {
            console.log('ERRO NO LOGIN')
        }
    }
    catch(err) {
    }
}

async function checkUserType () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/auth/validate_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
    }
}

async function getAllDepartments () {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
    }
}

async function getSpecificDepartment (idCompany) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/departments/${idCompany}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
    }
}

async function getAllUsers () {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()
        return response
    } catch (err) {
    }

}

export {
    getSectors,
    getCompanies,
    getCompaniesBySector,
    register,
    login,
    checkUserType,
    getAllDepartments,
    getSpecificDepartment,
    getAllUsers
}