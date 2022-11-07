import { checkPermission } from "./restrictions.js";
import { exitPage } from "./localStorage.js";
import { getCompanies, getAllDepartments, getSpecificDepartment, getAllUsers, deleteUser, editUser, createDepartment, editDepartment, deleteDepartment, usersWithoutDepartment, hireUsers, demitUsers } from "./requests.js";
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
            renderSpecificDepartment(selectedCompany)
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

async function renderSpecificDepartment (id) {

    const departments = await getSpecificDepartment(id)

    const departmentsList = document.querySelector('.departments-list')

    departmentsList.innerHTML = ''

    departments.forEach(item => {
        let li = document.createElement('li')
        li.classList = 'display-flex justify-content-center align-items-center'

        let departmentName = document.createElement('p')
        departmentName.classList.add('.department-name')
        departmentName.innerText = item.name

        let departmentDesc = document.createElement('p')
        departmentDesc.classList.add('.department-desc')
        departmentDesc.innerText = item.description

        let companyName = document.createElement('p')
        companyName.classList.add('.company-name')
        companyName.innerText = item.companies.name

        let div = document.createElement('div')
        div.classList.add('.icons-box')

        let imgEye = document.createElement('img')
        imgEye.src = "/src/assets/eyeIcon.svg"

        imgEye.addEventListener('click', () => {
            openDepartmentModal(item.name, item.description, item.companies.name, item.uuid)
        })

        let imgEdit = document.createElement('img')
        imgEdit.src = "/src/assets/editIcon.svg"

        imgEdit.addEventListener('click', () => {
            modalEditDepartment(item.description, item.uuid)
        })

        let imgTrash = document.createElement('img')
        imgTrash.src = "/src/assets/trashIcon.svg"

        imgTrash.addEventListener('click', () => {
            modalDeleteDepartments(item.name, item.uuid)
        })

        div.append(imgEye, imgEdit, imgTrash)
        li.append(departmentName, departmentDesc, companyName, div)

        departmentsList.appendChild(li)
    })
} 

async function renderAllDepartments () {

    const departments = await getAllDepartments()

    const departmentsList = document.querySelector('.departments-list')

    departmentsList.innerHTML = ''

    departments.forEach(item => {
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

renderAllDepartments()

async function renderAllUsers () {

    const usersList = document.querySelector('.users-list')

    const users = await getAllUsers()

    usersList.innerHTML = ''

    users.forEach(item => {
        let li = document.createElement('li')

        let pUsername = document.createElement('p')
        pUsername.innerText = item.username

        let pProLevel = document.createElement('p')
        pProLevel.innerText = item.professional_level

        if(pProLevel.innerText === null) {
            pProLevel.innerText = ''
        }

        let pCompany = document.createElement('p') //COLOCAR O NOME DA EMPRESA EM QUE O USUÁRIO TRABALHA

        let div = document.createElement('div')

        let imgEdit = document.createElement('img')
        imgEdit.src = "/src/assets/editIconSelec.svg"

        imgEdit.addEventListener('click', () => {
            modalEditUser(item.uuid)
        })

        let imgTrash = document.createElement('img')
        imgTrash.src = "/src/assets/trashIcon.svg"

        let name = item.username

        let userID = item.uuid

        imgTrash.addEventListener('click', () => {
            modalDeleteUser(name, userID)
        })

        div.append(imgEdit, imgTrash)
        li.append(pUsername, pProLevel, pCompany, div)

        usersList.appendChild(li)
    })
}

renderAllUsers()

function modalDeleteUser (username, userId) {
    let div = document.createElement('div')

    let span = document.createElement('span')

    let buttonClose = document.createElement('button')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let pWarning = document.createElement('p')
    pWarning.innerText = `Realmente deseja remover o usuário ${username}?`

    let buttonDelete = document.createElement('button')
    buttonDelete.innerText = 'Deletar'

    buttonDelete.addEventListener('click', async () => {
        await deleteUser(userId)
        await renderAllUsers()
    })

    closeModal(buttonDelete)

    span.appendChild(buttonClose)
    div.append(span, pWarning, buttonDelete)

    openModal(div)
}

function modalEditUser(userId) {

    let div = document.createElement('div')

    let span = document.createElement('span')

    let buttonClose = document.createElement('button')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let p = document.createElement('p')
    p.innerText = 'Editar Usuário'

    const edit = {}

    let selectKindOfWork = document.createElement('select')
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
    button.type = 'submit'
    button.innerText = 'Editar'

    button.addEventListener('click', async () => {
        await editUser(edit, userId)
        await renderAllUsers()
    })

    closeModal(button)

    span.appendChild(buttonClose)
    div.append(span, p, selectKindOfWork, selectProLevel, button)
    openModal(div)
}

async function modalCreateDepartment () {

    const companyList = await getCompanies()

    let div = document.createElement('div')
    
    let span = document.createElement('span')

    let buttonClose = document.createElement('button')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let p = document.createElement('p')
    p.innerText = 'Criar Departamento'

    let form = document.createElement('form')

    let inputDepartamentName = document.createElement('input')
    inputDepartamentName.placeholder = 'Nome do departamento'

    let inputDepartamentDesc = document.createElement('input')
    inputDepartamentDesc.placeholder = 'Descrição'

    let selectProLevel = document.createElement('select')
    selectProLevel.innerHTML = `
    <option selected disabled>Selecionar empresa</option>
    `

    let button = document.createElement('button')
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
    div.append(span, p, form)

    openModal(div)
}

function modalEditDepartment (valueDesc, departmentId) {
    let div = document.createElement('div')
    
    let span = document.createElement('span')

    let buttonClose = document.createElement('button')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let p = document.createElement('p')
    p.innerText = 'Editar Departamento'

    let inputEdit = document.createElement('input')
    inputEdit.placeholder = 'Valores anteriores da descrição'
    inputEdit.value = valueDesc

    let button = document.createElement('button')
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
    div.append(span, p, inputEdit, button)

    openModal(div)
}

function modalDeleteDepartments (departmentName, departmentId) {
    let div = document.createElement('div')
    
    let span = document.createElement('span')

    let buttonClose = document.createElement('button')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let p = document.createElement('p')
    p.innerText = `Realmente deseja deletar o Departamento ${departmentName} e demitir seus funcionários?`

    let button = document.createElement('button')
    button.innerText = 'Confirmar'

    button.addEventListener('click', async () => {
       await deleteDepartment(departmentId)
       await renderAllDepartments()
    })

    closeModal(button)

    span.appendChild(buttonClose)
    div.append(span, p, button)

    openModal(div)
}

async function openDepartmentModal (departName, departmentDesc, companyName, departmentId) {

    const usersOutDepartments = await usersWithoutDepartment()

    const allUsers = await getAllUsers()

    const allDepartments = await getAllDepartments()

    let divModal = document.createElement('div')

    let buttonClose = document.createElement('button')
    buttonClose.innerText = 'X'

    closeModal(buttonClose)

    let departmentName = document.createElement('p')
    departmentName.innerText = departName

    let div = document.createElement('div')

    let spanInfos = document.createElement('span')

    let pDesc = document.createElement('p')
    pDesc.innerText = departmentDesc

    let pCompany = document.createElement('p')
    pCompany.innerText = companyName

    let select = document.createElement('select')
    select.innerHTML = `<option selected disabled>Selecionar usuário</option>`

    const hire = {}
    
    usersOutDepartments.forEach(item => {
        let option = document.createElement('option')
        option.innerText = item.username
        option.value = item.uuid

        select.appendChild(option)
    })

    select.addEventListener('change', (event) => {
        let user = 'user_uuid'
        hire[user] = event.target.value
    })

    let ul = document.createElement('ul')

    allUsers.forEach(item => {
        if(item.department_uuid === departmentId) {

            let li = document.createElement('li')

            let pUsername = document.createElement('p')
            pUsername.innerText = item.username

            let pProLevel = document.createElement('p')
            pProLevel.innerText = item.professional_level

            let pCompanyName = document.createElement('p')

            pCompanyName.innerText = companyName
           
            let span = document.createElement('span')

            let button = document.createElement('button')
            button.innerText = 'Desligar'

            span.appendChild(button)
            li.append(pUsername, pProLevel, pCompanyName, span)

            ul.appendChild(li)

            button.addEventListener('click', async () => {
                await demitUsers(item.uuid)
            })
            closeModal(button)
        }
    })
    

    let buttonGet = document.createElement('button')
    buttonGet.innerText = 'Contratar'

    buttonGet.addEventListener('click', async () => {

        let department = 'department_uuid'

        hire[department] = departmentId

        await hireUsers(hire)

        const allNewUsers = await getAllUsers()

        ul.innerHTML = ''

        allNewUsers.forEach(item => {
            if(item.department_uuid === departmentId) {
    
                let li = document.createElement('li')
    
                let pUsername = document.createElement('p')
                pUsername.innerText = item.username
    
                let pProLevel = document.createElement('p')
                pProLevel.innerText = item.professional_level
    
                let pCompanyName = document.createElement('p')
                pCompanyName.innerText = companyName
    
                let span = document.createElement('span')
    
                let button = document.createElement('button')
                button.innerText = 'Desligar'
    
                span.appendChild(button)
                li.append(pUsername, pProLevel, pCompanyName, span)
    
                ul.appendChild(li)

                button.addEventListener('click', async () => {
                    await demitUsers(item.uuid)
                })
                closeModal(button)
            }
        })
    })

    spanInfos.append(pDesc, pCompany)
    div.append(spanInfos, select)
    divModal.append(buttonClose, departmentName, div, buttonGet, ul)

    openModal(divModal)
}

