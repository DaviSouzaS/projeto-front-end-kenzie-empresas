import { getUserInfos, getCompanyInfos, userDepartmentInfos, editUserInfos } from "./requests.js";
import { checkPermission } from "./restrictions.js";
import { exitPage } from "./localStorage.js";
import { openModal, closeModal, closeModalInstantly } from "./modal.js";

const redirectAdminPage = '/src/pages/adminPage/index.html'

checkPermission(true, redirectAdminPage)

exitPage()

async function renderUserInfos () {

    const userInfos = await getUserInfos()

    let section = document.querySelector('.user-infos')

    section.innerHTML = ''

    let divInfos = document.createElement('div')
    divInfos.classList.add('infos')

    let pUsername = document.createElement('p')
    pUsername.classList.add('username')
    pUsername.innerText = userInfos.username

    let divUserInfos = document.createElement('div')
    divUserInfos.classList = 'display-flex gap-145'

    let pEmail = document.createElement('p')
    pEmail.innerText = `Email: ${userInfos.email}`

    let pProLevel = document.createElement('p')

    if(userInfos.professional_level === null) {
        pProLevel.innerText = ''
    }
    else {
        pProLevel.innerText = userInfos.professional_level
    }

    let pKindOfWork = document.createElement('p')

    if(userInfos.kind_of_work === null) {
        pKindOfWork.innerText = ''
    }
    else {
        pKindOfWork.innerText = userInfos.kind_of_work
    }

    let div = document.createElement('div')
    div.classList.add('button-edit')

    let img = document.createElement('img')
    img.src = '/src/assets/editIconSelec.svg'
    img.alt = 'edit-icon'

    img.addEventListener('click', () => {
        modalEditUser(userInfos.username, userInfos.email)
    })

    divUserInfos.append(pEmail, pProLevel, pKindOfWork)
    divInfos.append(pUsername, divUserInfos)

    div.appendChild(img)

    section.append(divInfos, div)

}

renderUserInfos()

async function renderCompanyInfos() {

    const companyInfos = await getCompanyInfos()

    const userInfos = await getUserInfos()

    let section = document.querySelector('.depart-infos')

    if (userInfos.department_uuid === null) {
        let div = document.createElement('div')
        div.classList = 'waring-box display-flex justify-content-center align-items-center'

        let p = document.createElement('p')
        p.innerText = 'Você ainda não foi contratado'

        div.appendChild(p)
        section.appendChild(div)
    }

    else {
        const userDepart = await userDepartmentInfos()

        let infos = companyInfos[0].users

        let ul = document.createElement('ul')
        ul.classList = 'co-workers-list display-flex space-around warp'

        let departmentName = companyInfos[0].name

        let companyName = userDepart.name

        let div = document.createElement('div')
        div.classList = 'depart-infos-header display-flex justify-content-center align-items-center'

        let p = document.createElement('p')
        p.innerText = `${companyName}-${departmentName}`

        infos.forEach(item => {
            let li = document.createElement('li')
            
            if(userInfos.uuid === item.uuid) {
                li.innerHTML = ''
            }

            else {
                
                let pUsername = document.createElement('p')
                pUsername.classList.add('co-worker-name')
                pUsername.innerText = item.username

                let pProLevel = document.createElement('p')
                pProLevel.classList.add('co-worker-pro-level')
                pProLevel.innerText = item.professional_level

                li.append(pUsername, pProLevel)
                ul.appendChild(li)
                div.appendChild(p)
                section.append(div, ul)
            }
        });
        
    }
}

renderCompanyInfos()

function modalEditUser(username, email) {

    let div = document.createElement('div')
    div.classList = 'modal-edit-user'

    let divModalContainer = document.createElement('div')
    divModalContainer.classList = 'display-flex align-items-center flex-direction-column'

    let span = document.createElement('span')
    span.classList = 'display-flex flex-end box-close-button'

    let buttonClose = document.createElement('button')
    buttonClose.classList.add('button-close-modal')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let p = document.createElement('p')
    p.innerText = 'Editar Perfil'

    let divBox = document.createElement('div')
    divBox.classList.add('title-modal')

    let form = document.createElement('form')
    form.classList = 'display-flex flex-direction-column gap-15'

    let inputName = document.createElement('input')
    inputName.value = username
    inputName.classList.add('input-default')
    inputName.id = 'username'
    inputName.placeholder = 'Seu nome'

    let inputEmail = document.createElement('input')
    inputEmail.value = email
    inputEmail.classList.add('input-default')
    inputEmail.id = 'email'
    inputEmail.placeholder = 'Seu e-mail'

    let inputPass = document.createElement('input')
    inputPass.classList.add('input-default')
    inputPass.type = 'password'
    inputPass.id = 'password'
    inputPass.placeholder = 'Sua senha'

    let button = document.createElement('button')
    button.classList.add('button-input')
    button.type = 'submit'
    button.innerText = 'Editar perfil'

    const newPost = {}

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        let valueName = inputName.value

        let valueEmail = inputEmail.value

        let valuePass = inputPass.value

        if (valueName === '') {
        }
        else {
            newPost[inputName.id] = valueName
        }

        if (valueEmail === '') {
        }
        else {
            newPost[inputEmail.id] = valueEmail
        }

        if (valuePass === '') {
        }
        else {
            newPost[inputPass.id] = valuePass
        }
        
        await editUserInfos(newPost)
        await renderUserInfos()
        closeModalInstantly()

       
    }) 

    span.appendChild(buttonClose)
    form.append(inputName, inputEmail, inputPass, button)
    divBox.appendChild(p)
    divModalContainer.append(divBox, form)
    div.append(span, divModalContainer)

    openModal(div)
}