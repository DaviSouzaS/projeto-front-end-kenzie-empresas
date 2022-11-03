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

export {
    getSectors,
    getCompanies,
    getCompaniesBySector
}