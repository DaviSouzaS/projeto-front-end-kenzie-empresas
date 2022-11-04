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

export {
    getSectors,
    getCompanies,
    getCompaniesBySector,
    register
}