import { checkPermission } from "./restrictions.js";
import { exitPage } from "./localStorage.js";
import { getCompanies, getAllDepartments, getSpecificDepartment, getAllUsers } from "./requests.js";

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
}

renderListCompanies()

async function renderSpecificDepartment (id) {

    const departments = await getSpecificDepartment(id)

    const departmentsList = document.querySelector('.departments-list')

    departmentsList.innerHTML = ''

    departments.forEach(item => {
        let li = document.createElement('li')

        let departmentName = document.createElement('p')
        departmentName.innerText = item.name

        let departmentDesc = document.createElement('p')
        departmentDesc.innerText = item.description

        let companyName = document.createElement('p')
        companyName.innerText = item.companies.name

        let div = document.createElement('div')

        let imgEye = document.createElement('img')
        imgEye.src = "/src/assets/eyeIcon.svg"

        let imgEdit = document.createElement('img')
        imgEdit.src = "/src/assets/editIcon.svg"

        let imgTrash = document.createElement('img')
        imgTrash.src = "/src/assets/trashIcon.svg"

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

        let departmentName = document.createElement('p')
        departmentName.innerText = item.name

        let departmentDesc = document.createElement('p')
        departmentDesc.innerText = item.description

        let companyName = document.createElement('p')
        companyName.innerText = item.companies.name

        let div = document.createElement('div')

        let imgEye = document.createElement('img')
        imgEye.src = "/src/assets/eyeIcon.svg"

        let imgEdit = document.createElement('img')
        imgEdit.src = "/src/assets/editIcon.svg"

        let imgTrash = document.createElement('img')
        imgTrash.src = "/src/assets/trashIcon.svg"

        div.append(imgEye, imgEdit, imgTrash)
        li.append(departmentName, departmentDesc, companyName, div)

        departmentsList.appendChild(li)
    })
}

renderAllDepartments()

async function renderAllUsers () {

    const usersList = document.querySelector('.users-list')

    const users = await getAllUsers()

    users.forEach(item => {

        let li = document.createElement('li')

        let pUsername = document.createElement('p')
        pUsername.innerText = item.username

        let pProLevel = document.createElement('p')
        pProLevel.innerText = item.professional_level

        if(pProLevel.innerText === null) {
            pProLevel.innerText = ''
        }

        // let pCompany = document.createElement('p') PRECISO COLOCAR O NOME DA EMPRESA EM QUE O USUÁRIO TRABALHA
       
        let div = document.createElement('div')

        let imgEdit = document.createElement('img')
        imgEdit.src = "/src/assets/editIconSelec.svg"

        let imgTrash = document.createElement('img')
        imgTrash.src = "/src/assets/trashIcon.svg"

        div.append(imgEdit, imgTrash)
        li.append(pUsername, pProLevel, div)

        usersList.appendChild(li)
    })

}

renderAllUsers()
