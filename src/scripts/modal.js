const body = document.querySelector('body')

const modalBg = document.createElement('div')
modalBg.classList = 'modal-bg display-flex justify-content-center align-items-center'

function openModal (contentModal) {

    modalBg.appendChild(contentModal)
    body.appendChild(modalBg)
}

function closeModal (button) {

    button.addEventListener('click', () => {
        modalBg.remove()
        modalBg.innerHTML = ''
    })
}

export {
    openModal,
    closeModal
}