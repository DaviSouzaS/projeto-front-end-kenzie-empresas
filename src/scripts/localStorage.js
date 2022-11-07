function getLocalStorage () {
    const user = JSON.parse(localStorage.getItem ('token')) || ''

    return user
}

function exitPage () {
    const buttonExit = document.querySelector('.exit-page')

    buttonExit.addEventListener('click', () => {
        localStorage.removeItem('token')
        window.location.replace('/index.html')
    })
}

export {
    getLocalStorage, 
    exitPage
}