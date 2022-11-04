import { getLocalStorage } from "./localStorage.js"
import { checkUserType } from "./requests.js"

export async function checkPermission(userType)  {

    const token = getLocalStorage()

    const validateUser = await checkUserType()
    
    if(validateUser.is_admin === userType) {
        window.location.replace('/index.html')
    }

    else if (token === "") {
        window.location.replace('/index.html')
    }
}

