export const getLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem ('token')) || ''

    return user
}