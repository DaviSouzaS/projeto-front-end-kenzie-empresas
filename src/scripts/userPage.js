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

    let pUsername = document.createElement('p')
    pUsername.innerText = userInfos.username

    let span = document.createElement('span')

    let pEmail = document.createElement('p')
    pEmail.innerText = userInfos.email

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

    let img = document.createElement('img')
    img.src = '/src/assets/editIconSelec.svg'
    img.alt = 'edit-icon'

    img.addEventListener('click', () => {
        modalEditUser()
    })

    span.append(pEmail, pProLevel, pKindOfWork)
    divInfos.append(pUsername, span)

    div.appendChild(img)

    section.append(divInfos, div)

}

renderUserInfos()

async function renderCompanyInfos() {

    const companyInfos = await getCompanyInfos()

    const userInfos = await getUserInfos()

    let section = document.querySelector('.company-infos')

    if (userInfos.department_uuid === null) {
        let p = document.createElement('p')
        p.innerText = 'Você ainda não foi contratado'

        section.appendChild(p)
    }

    else {
        const userDepart = await userDepartmentInfos()

        let infos = companyInfos[0].users

        let ul = document.createElement('ul')
        
        infos.forEach(item => {
            let li = document.createElement('li')
            
            if(userInfos.uuid === item.uuid) {
                li.innerHTML = ''
            }

            else {
                let departmentName = companyInfos[0].name

                let companyName = userDepart.name

                let div = document.createElement('div')
                div.innerText = `${companyName}-${departmentName}`

                let pUsername = document.createElement('p')
                pUsername.innerText = item.username

                let pProLevel = document.createElement('p')
                pProLevel.innerText = item.professional_level

                li.append(pUsername, pProLevel)
                ul.appendChild(li)
                section.append(div, ul)
            }
        });
        
    }
}

renderCompanyInfos()

function modalEditUser() {

    let div = document.createElement('div')

    let span = document.createElement('span')

    let buttonClose = document.createElement('button')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let p = document.createElement('p')
    p.innerText = 'Editar Perfil'

    let form = document.createElement('form')

    let inputName = document.createElement('input')
    inputName.id = 'username'
    inputName.placeholder = 'Seu nome'

    let inputEmail = document.createElement('input')
    inputEmail.id = 'email'
    inputEmail.placeholder = 'Seu e-mail'

    let inputPass = document.createElement('input')
    inputPass.type = 'password'
    inputPass.id = 'password'
    inputPass.placeholder = 'Sua senha'

    let button = document.createElement('button')
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
    div.append(span, p, form)

    openModal(div)
}