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

async function getSpecificDepartments (idCompany) {
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

async function deleteUser (userId) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/admin/delete_user/${userId}`, {
            method: "DELETE",
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

async function editUser (body, userId) {
    const localStorage = getLocalStorage()
    
    try {
        const request = await fetch(`${baseURL}/admin/update_user/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body) 
        })
        const response = await request.json()
        return response
    } catch (err) {
    }
}

async function createDepartment (body) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body) 
        })
        const response = await request.json()
        return response
    } catch (err) {
    }
}

async function editDepartment (departmentId, body) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/departments/${departmentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body) 
        })
        const response = await request.json()
        return response
    } catch (err) {
    }
}

async function deleteDepartment (departmentId) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/departments/${departmentId}`, {
            method: "DELETE",
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

async function usersWithoutDepartment () {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/admin/out_of_work`, {
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

async function hireUsers (body) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body) 
        })
        const response = await request.json()
        return response
    } catch (err) {
    }
}

async function demitUsers (userId) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/departments/dismiss/${userId}`, {
            method: "PATCH",
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

async function getUserInfos () {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/users/profile`, {
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

async function getCompanyInfos () {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/users/departments/coworkers`, {
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

async function userDepartmentInfos () {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/users/departments`, {
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

async function editUserInfos (body) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseURL}/users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body) 
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
    getSpecificDepartments,
    getAllUsers,
    deleteUser,
    editUser,
    createDepartment,
    editDepartment,
    deleteDepartment,
    usersWithoutDepartment,
    hireUsers,
    demitUsers,
    getUserInfos,
    getCompanyInfos,
    userDepartmentInfos,
    editUserInfos
}