import { getProjectsArray } from "./local-storage-functionality";
import { displayProjectTabs } from "../src/tab-functionality";

function makeProjectForm() {
    const form = document.createElement('form');
    form.setAttribute('id', 'add-project-form');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.setAttribute('id', 'project-name-input');
    nameInput.required = 'true';
    nameInput.placeholder = 'Enter project name';
    form.appendChild(nameInput);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');

    const addBtn = document.createElement('input');
    addBtn.type = 'submit';
    addBtn.value = 'Add';
    addBtn.setAttribute('id', 'submit-project-btn');
    buttonDiv.appendChild(addBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.setAttribute('id', 'cancel-project-btn');
    cancelBtn.addEventListener('click', cancel);
    buttonDiv.appendChild(cancelBtn);

    form.appendChild(buttonDiv);

    form.addEventListener('submit', addToLocalStorage);

    document.getElementById('project-form-div').appendChild(form);

    return form;
}

function closeForm() {
    const form = document.getElementById('add-project-form');
    form.reset();
    form.classList.add('hidden');
    document.getElementById('add-project-btn').classList.remove('hidden');
}

function cancel() {
    closeForm();
    
}

function addToLocalStorage(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('project-name-input').value.toLowerCase().trim();
    if (nameInput.trim().length === 0) {
        alert('Project name must not be blank');
        return;
    }
    const projects = localStorage.getItem(0);
    for (let i = 0; i < getProjectsArray().length; i++) {
        let projectString = getProjectsArray()[i];
        if (nameInput === projectString) {
            alert('This project name already exists. Please choose a different name for your project.');
            return;
        }
        
    }
    const updatedProjects = projects + '!$-' + nameInput + '!$-';
    localStorage.setItem(0, updatedProjects);
    
    closeForm();    
    displayProjectTabs();
}



export default makeProjectForm;