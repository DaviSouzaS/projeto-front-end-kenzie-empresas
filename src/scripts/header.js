export function createMenuHeader () {

    const menuIconBox = document.querySelector('.menu-icon-box')

    const menuIcon = document.createElement('img')
    menuIcon.src = '/src/assets/menuIcon.svg'
    menuIcon.alt = 'menu-icon'
    
    menuIconBox.appendChild(menuIcon)

    const closeMenuIcon = document.createElement('img')
    closeMenuIcon.src = '/src/assets/closeIcon.svg'
    closeMenuIcon.alt = 'close-modal-icon'

    menuIconBox.addEventListener('click', () => {
        const menuHamburguer = document.querySelector('.menu-hamburguer')

        if (menuHamburguer.style.display === "flex") {
            menuIconBox.innerHTML = ""
            menuIconBox.appendChild(menuIcon)
            menuHamburguer.style.display = "none"
        } else {
            menuHamburguer.style.display = "flex"
            menuIconBox.innerHTML = ""
            menuIconBox.appendChild(closeMenuIcon)
        }
    }) 
}


    

