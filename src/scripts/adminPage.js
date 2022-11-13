import { checkPermission } from "./restrictions.js";
import { exitPage } from "./localStorage.js";
import { getCompanies, getAllDepartments, getSpecificDepartments, getAllUsers, deleteUser, editUser, createDepartment, editDepartment, deleteDepartment, usersWithoutDepartment, hireUsers, demitUsers } from "./requests.js";
import { openModal, closeModal, closeModalInstantly } from "./modal.js";

const redirectUserPage = '/src/pages/userPage/index.html'

checkPermission(false, redirectUserPage)

exitPage()

async function renderListCompanies () {

    const companyList = await getCompanies()

    const companySelect = document.querySelector('.company-list')

    companyList.forEach(item => {

        let option = document.createElement('option')
        option.innerText = item.name
        option.value = item.uuid

        companySelect.appendChild(option)
    });

    companySelect.addEventListener('change', (event) => {
        
        let selectedCompany = event.target.value

        if (selectedCompany !== 'select-companies') {
            renderSpecificDepartments(selectedCompany)
        }
        else {
            renderAllDepartments()
        }
    }) 

    const createDepartmentButton = document.querySelector('.add-department')

    createDepartmentButton.addEventListener('click', () => {
        modalCreateDepartment()
    })

}

renderListCompanies()

async function renderDepartmentsCards (depart) {
    const departmentsList = document.querySelector('.departments-list')

    departmentsList.innerHTML = ''

    let divWaring = document.createElement('div')
    divWaring.classList = 'no-departments display-flex justify-content-center align-items-center'

    let noDepartments = document.createElement('p')
    noDepartments.innerText = 'Sem departamentos cadastrados'

    divWaring.appendChild(noDepartments)

    if (depart.length === 0) {
        departmentsList.appendChild(divWaring)
    }

    else {
    depart.forEach(item => {
        let li = document.createElement('li')
        li.classList = 'display-flex justify-content-center flex-direction-column'

        let departmentName = document.createElement('p')
        departmentName.classList.add('department-name')
        departmentName.innerText = item.name

        let departmentDesc = document.createElement('p')
        departmentDesc.classList.add('department-desc')
        departmentDesc.innerText = item.description

        let companyName = document.createElement('p')
        companyName.classList.add('company-name')
        companyName.innerText = item.companies.name

        let div = document.createElement('div')
        div.classList = 'display-flex justify-content-center gap-20'

        let imgEye = document.createElement('img')
        imgEye.classList.add('button-icon')
        imgEye.src = "/src/assets/eyeIcon.svg"

        imgEye.addEventListener('click', () => {
            openDepartmentModal(item.name, item.description, item.companies.name, item.uuid)
        })

        let imgEdit = document.createElement('img')
        imgEdit.classList.add('button-icon')
        imgEdit.src = "/src/assets/editIcon.svg"

        imgEdit.addEventListener('click', () => {
            modalEditDepartment(item.description, item.uuid)
        })

        let imgTrash = document.createElement('img')
        imgTrash.classList.add('button-icon')
        imgTrash.src = "/src/assets/trashIcon.svg"

        imgTrash.addEventListener('click', () => {
            modalDeleteDepartments(item.name, item.uuid)
        })

        div.append(imgEye, imgEdit, imgTrash)
        li.append(departmentName, departmentDesc, companyName, div)

        departmentsList.appendChild(li)
    })
    }
}

async function renderSpecificDepartments (id) {

    const department = await getSpecificDepartments(id)

    renderDepartmentsCards(department)
} 

async function renderAllDepartments () {

    const departments = await getAllDepartments()

    renderDepartmentsCards(departments)
}

renderAllDepartments()

async function renderAllUsers () {

    const usersList = document.querySelector('.users-list')

    const users = await getAllUsers()

    usersList.innerHTML = ''

    let divWaring = document.createElement('div')
    divWaring.classList = 'no-departments display-flex justify-content-center align-items-center'

    let noUsers = document.createElement('p')
    noUsers.innerText = 'Sem usuários cadastrados'

    if (users.length === 1) {
        divWaring.appendChild(noUsers)
        usersList.appendChild(divWaring)
    }

    else {
        users.forEach(item => {
        
            let li = document.createElement('li')
    
            let pUsername = document.createElement('p')
            pUsername.classList.add('user-name')
            pUsername.innerText = item.username
    
            let pProLevel = document.createElement('p')
            pProLevel.classList.add('pro-level-item')
            pProLevel.innerText = item.professional_level
    
            if(pProLevel.innerText === null) {
                pProLevel.innerText = ''
            }
    
            let div = document.createElement('div')
            div.classList = 'display-flex justify-content-center gap-20 icon-box'
    
            let imgEdit = document.createElement('img')
            imgEdit.classList.add('button-icon')
            imgEdit.src = "/src/assets/editIconSelec.svg"
    
            imgEdit.addEventListener('click', () => {
                modalEditUser(item.uuid)
            })
    
            let imgTrash = document.createElement('img')
            imgTrash.classList.add('button-icon')
            imgTrash.src = "/src/assets/trashIcon.svg"
    
            let name = item.username
    
            let userID = item.uuid
    
            imgTrash.addEventListener('click', () => {
                modalDeleteUser(name, userID)
            })
    
            div.append(imgEdit, imgTrash)
            li.append(pUsername, pProLevel, div)
    
            if (userID !== '930db5a3-70df-48ba-b4c0-d4fb86e55d49') {
                usersList.appendChild(li)
            }
        })
    }
}

renderAllUsers()

function modalDeleteUser (username, userId) {
    let div = document.createElement('div')
    div.classList = 'modal-delete-user display-flex flex-direction-column align-items-center'

    let span = document.createElement('span')
    span.classList = 'box-close-button display-flex flex-end'

    let buttonClose = document.createElement('button')
    buttonClose.classList.add('button-close-modal')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let divContent = document.createElement('div')
    divContent.classList = 'modal-contet display-flex flex-direction-column justify-content-center align-items-center'

    let pWarning = document.createElement('p')
    pWarning.classList = 'modal-title delete-user'
    pWarning.innerText = `Realmente deseja remover o usuário ${username}?`

    let buttonDelete = document.createElement('button')
    buttonDelete.classList.add('button-input-delete')
    buttonDelete.innerText = 'Deletar'

    buttonDelete.addEventListener('click', async () => {
        await deleteUser(userId)
        await renderAllUsers()
    })

    closeModal(buttonDelete)

    span.appendChild(buttonClose)
    divContent.append(pWarning, buttonDelete)
    div.append(span, divContent)

    openModal(div)
}

function modalEditUser(userId) {

    let div = document.createElement('div')
    div.classList = 'modal-edit-user display-flex flex-direction-column align-items-center'

    let span = document.createElement('span')
    span.classList = 'box-close-button display-flex flex-end'

    let buttonClose = document.createElement('button')
    buttonClose.classList.add('button-close-modal')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let divContent = document.createElement('div')
    divContent.classList = 'modal-contet display-flex flex-direction-column justify-content-center align-items-center'

    let spanTitle = document.createElement('span')
    spanTitle.classList.add('title-modal-box')

    let p = document.createElement('p')
    p.classList = 'modal-title edit-user'
    p.innerText = 'Editar Usuário'

    const edit = {}

    let selectKindOfWork = document.createElement('select')
    selectKindOfWork.classList.add('select-modals')
    selectKindOfWork.innerHTML = `
    <option selected disabled>Selecionar modalidade de trabalho</option>
    <option value="presencial">Presencial</option>
    <option value="hibrido">Híbrido</option>
    <option value="home office">Home office</option>
    `
    selectKindOfWork.addEventListener('change', async (event) => {

        const editSelects = event.target.value

        let kindOfWork = 'kind_of_work'

        edit[kindOfWork] = editSelects
    })

    let selectProLevel = document.createElement('select')
    selectProLevel.classList.add('select-modals')
    selectProLevel.innerHTML = `
    <option selected disabled>Selecionar nível profissional</option>
    <option value="estágio">Estágio</option>
    <option value="júnior">Júnior</option>
    <option value="pleno">Pleno</option>
    <option value="sênior">Sênior</option>
    `
    selectProLevel.addEventListener('change', async (event) => {

        const editSelects = event.target.value

        let proLevel = 'professional_level'

        edit[proLevel] = editSelects
    })

    let button = document.createElement('button')
    button.classList.add('button-input')
    button.type = 'submit'
    button.innerText = 'Editar'

    button.addEventListener('click', async () => {
        await editUser(edit, userId)
        await renderAllUsers()
    })

    closeModal(button)

    span.appendChild(buttonClose)
    spanTitle.appendChild(p)
    divContent.append(spanTitle, selectKindOfWork, selectProLevel, button)
    div.append(span, divContent)
    openModal(div)
}

async function modalCreateDepartment () {

    const companyList = await getCompanies()

    let div = document.createElement('div')
    div.classList = 'modal-create-departament display-flex flex-direction-column align-items-center'
    
    let span = document.createElement('span')
    span.classList = 'box-close-button display-flex flex-end'

    let buttonClose = document.createElement('button')
    buttonClose.classList.add ('button-close-modal')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let spanTitle = document.createElement('span')
    spanTitle.classList.add('title-modal-box')

    let p = document.createElement('p')
    p.classList = 'modal-title title-create-department'
    p.innerText = 'Criar Departamento'

    let form = document.createElement('form')
    form.classList = 'display-flex flex-direction-column gap-15'

    let inputDepartamentName = document.createElement('input')
    inputDepartamentName.classList.add('input-default')
    inputDepartamentName.placeholder = 'Nome do departamento'

    let inputDepartamentDesc = document.createElement('input')
    inputDepartamentDesc.classList.add('input-default')
    inputDepartamentDesc.placeholder = 'Descrição'

    let selectProLevel = document.createElement('select')
    selectProLevel.classList.add('select-modals')
    selectProLevel.innerHTML = `
    <option selected disabled>Selecionar empresa</option>
    `

    let button = document.createElement('button')
    button.classList.add('button-input')
    button.type = 'submit'
    button.innerText = 'Criar o departamento'

    const newDepartament = {}

    companyList.forEach(item => {
        let option = document.createElement('option')
        option.innerText = item.name
        option.value = item.uuid

        selectProLevel.appendChild(option)
    })

    selectProLevel.addEventListener('change', (event) => {
        let company_uuid = 'company_uuid'
        newDepartament[company_uuid] = event.target.value
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        let name = 'name'
        let description = 'description'

        newDepartament[name] = inputDepartamentName.value
        newDepartament[description] = inputDepartamentDesc.value
        createDepartment(newDepartament)
        renderAllDepartments()
        closeModalInstantly()
    })

    span.appendChild(buttonClose)
    form.append(inputDepartamentName, inputDepartamentDesc, selectProLevel, button)
    spanTitle.appendChild(p)
    div.append(span, spanTitle, form)

    openModal(div)
}

function modalEditDepartment (valueDesc, departmentId) {
    let div = document.createElement('div')
    div.classList = 'modal-edit-department display-flex flex-direction-column align-items-center' 
    
    let span = document.createElement('span')
    span.classList = 'box-close-button display-flex flex-end'

    let buttonClose = document.createElement('button')
    buttonClose.classList.add('button-close-modal')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let divContent = document.createElement('div')
    divContent.classList = 'modal-contet display-flex flex-direction-column justify-content-center align-items-center'

    let spanTitle = document.createElement('span')
    spanTitle.classList.add('title-modal-box')

    let p = document.createElement('p')
    p.classList.add('modal-title')
    p.innerText = 'Editar Departamento'

    let inputEdit = document.createElement('input')
    inputEdit.classList.add('input-edit-department')
    inputEdit.placeholder = 'Valores anteriores da descrição'
    inputEdit.value = valueDesc

    let button = document.createElement('button')
    button.classList.add('button-input')
    button.innerText = 'Salvar alterações'

    const edit = {}

    button.addEventListener('click', async () => {
        let desc = 'description'
        edit[desc] = inputEdit.value

        await editDepartment(departmentId, edit)
        await renderAllDepartments()
    })

    closeModal(button)

    span.appendChild(buttonClose)
    spanTitle.appendChild(p)
    divContent.append(spanTitle, inputEdit, button)
    div.append(span, divContent)

    openModal(div)
}

function modalDeleteDepartments (departmentName, departmentId) {
    let div = document.createElement('div')
    div.classList = 'modal-delete-department display-flex flex-direction-column align-items-center'
    
    let span = document.createElement('span')    
    span.classList = 'box-close-button display-flex flex-end'

    let buttonClose = document.createElement('button')    
    buttonClose.classList.add('button-close-modal')

    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let divContent = document.createElement('div')
    divContent.classList = 'modal-contet display-flex flex-direction-column justify-content-center align-items-center'

    let p = document.createElement('p')
    p.classList = 'modal-title title-delete-department'
    p.innerText = `Realmente deseja deletar o Departamento ${departmentName} e demitir seus funcionários?`

    let button = document.createElement('button')
    button.classList.add('button-input-delete')
    button.innerText = 'Confirmar'

    button.addEventListener('click', async () => {
       await deleteDepartment(departmentId)
       await renderAllDepartments()
    })

    closeModal(button)

    span.appendChild(buttonClose)
    divContent.append(p, button)
    div.append(span, divContent)

    openModal(div)
}

const hire = {}

async function renderUsersOutDepart () {
    const usersOutDepartments = await usersWithoutDepartment()

    let select = document.createElement('select')
    select.classList.add('select-users-out-depart')
    select.innerHTML = `<option selected disabled>Selecionar usuário</option>`

    let divSelectBox = document.querySelector('.select-box')

    divSelectBox.innerHTML = ''

    usersOutDepartments.forEach(item => {
        let option = document.createElement('option')
        option.innerText = item.username
        option.value = item.uuid

        select.appendChild(option)

        select.addEventListener('change', (event) => {
            let user = 'user_uuid'
            hire[user] = event.target.value
        })
    })

    divSelectBox.appendChild(select)
}

async function renderContractedUsers (enterpriseName, id) {
    const allUsers = await getAllUsers()

    let contractedUsersList = document.querySelector('.department-user-list')
    contractedUsersList.innerHTML = ''

    allUsers.forEach(item => {
        if(item.department_uuid === id) {

            let li = document.createElement('li')

            let pUsername = document.createElement('p')
            pUsername.classList.add('username-card')
            pUsername.innerText = item.username

            let pProLevel = document.createElement('p')
            pProLevel.classList.add('info-card')
            pProLevel.innerText = item.professional_level

            let pCompanyName = document.createElement('p')
            pCompanyName.classList.add('info-card')
            pCompanyName.innerText = enterpriseName
           
            let span = document.createElement('span')
            span.classList = 'button-off-box display-flex justify-content-center'

            let button = document.createElement('button')
            button.classList.add('button-off')
            button.innerText = 'Desligar'

            span.appendChild(button)
            li.append(pUsername, pProLevel, pCompanyName, span)

            contractedUsersList.appendChild(li)

            button.addEventListener('click', async () => {
                await demitUsers(item.uuid)
                renderUsersOutDepart()
                renderContractedUsers(enterpriseName, id)
            })
        }
    })
}

async function openDepartmentModal (departName, departmentDesc, companyName, departmentId) {

    let divModal = document.createElement('div')
    divModal.classList = 'modal-open-department display-flex flex-direction-column align-items-center'

    let spanBtn = document.createElement('span')    
    spanBtn.classList = 'box-close-button display-flex flex-end'

    let buttonClose = document.createElement('button')
    buttonClose.classList.add('button-close-modal')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let spanDepartment = document.createElement('span')
    spanDepartment.classList = 'department-title-box'

    let departmentName = document.createElement('p')
    departmentName.classList = 'modal-title title-department'
    departmentName.innerText = departName

    let div = document.createElement('div')
    div.classList = 'department-infos display-flex space-between'

    let selectBox = document.createElement('div')
    selectBox.classList.add('select-box')

    let spanInfos = document.createElement('span')

    let pDesc = document.createElement('p')
    pDesc.classList.add('modal-delete-department-desc')
    pDesc.innerText = departmentDesc

    let pCompany = document.createElement('p')
    pCompany.classList.add('modal-delete-company-name')
    pCompany.innerText = companyName

    renderUsersOutDepart()

    let ul = document.createElement('ul')
    ul.classList = 'display-flex align-items-center department-user-list'

    renderContractedUsers(companyName, departmentId)
    
    let divBoxButton = document.createElement('div')
    divBoxButton.classList = 'box-button-get display-flex flex-end'

    let buttonGet = document.createElement('button')
    buttonGet.classList.add('button-get')
    buttonGet.innerText = 'Contratar'

    buttonGet.addEventListener('click', async () => {

        let department = 'department_uuid'

        hire[department] = departmentId

        await hireUsers(hire)

        renderContractedUsers(companyName, departmentId)
        
        renderUsersOutDepart()
    })

    spanInfos.append(pDesc, pCompany)
    div.append(spanInfos, selectBox)  
    spanBtn.appendChild(buttonClose)
    spanDepartment.appendChild(departmentName)
    divBoxButton.appendChild(buttonGet)
    divModal.append(spanBtn, spanDepartment, div, divBoxButton, ul)

    openModal(divModal)
}