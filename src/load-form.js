import Task from '../src/Task';
import { getCurrentTab, refreshDisplay } from '../src/tab-functionality';
import { getStorageKey } from './local-storage-functionality';

let inputValue;
let dateValue;
let priorityValue;

function makeForm() {
    const form = document.createElement('form');
    form.setAttribute('id', 'task-form');

    const textInput = document.createElement('textarea');
    textInput.setAttribute('id', 'task-input');
    textInput.required = 'true';
    textInput.placeholder = 'Enter task here';
    form.appendChild(textInput);

    const date = document.createElement('input');
    date.type = 'date';
    date.setAttribute('id', 'task-due-date');
    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'task-due-date');
    dateLabel.textContent = 'Complete by:';
    form.appendChild(dateLabel);
    form.appendChild(date);

    const priorityDiv = makePriorityDiv();
    form.appendChild(priorityDiv);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');

    const addBtn = document.createElement('input');
    addBtn.type = 'submit';
    addBtn.value = 'Add';
    addBtn.setAttribute('id', 'submit-form-btn');
    buttonDiv.appendChild(addBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.setAttribute('id', 'cancel-form-btn');
    cancelBtn.addEventListener('click', cancel);
    buttonDiv.appendChild(cancelBtn);
    form.appendChild(buttonDiv);

    form.addEventListener('submit', addToLocalStorage);

    return form;
}

function addToLocalStorage(e) {
    //every time task is added to local storage, key becomes current length for accessibility 
    let storageKey = getStorageKey();

    e.preventDefault();
    const parentDiv = e.target.parentElement.parentElement;

    /*
    adding !$- before and after each input to make splitting more reliabe
    when parsing through local storage as a user can enter any combonination
    of chars
    */
    inputValue = '!$-' + document.getElementById('task-input').value + '!$-';
    dateValue = '!$-' + document.getElementById('task-due-date').value + '!$-';
    priorityValue = '!$-' + document.querySelector('input[name="priority"]:checked').value + '!$-';

    let project = `!$-${getCurrentTab()}!$-`;

    localStorage.setItem(storageKey, JSON.stringify(new Task(inputValue, dateValue, priorityValue, project, storageKey)));

    document.getElementById('task-form').reset();

    parentDiv.classList.add('hidden'); 

    refreshDisplay(getCurrentTab());
}

function makePriorityDiv() {
    const radioDiv = document.createElement('div');
    radioDiv.classList.add('radio-div');

    const headerDiv = document.createElement('div');
    const header = document.createElement('h4');
    header.textContent = 'Priority';
    headerDiv.appendChild(header);
    radioDiv.appendChild(headerDiv);

    const labelDiv = document.createElement('div');
    labelDiv.setAttribute('id', 'label-div');

    const noPriority = makeRadioButton('None');
    noPriority.setAttribute('id', 'none');
    noPriority.checked = 'true';
    const noPriorityLabel = document.createElement('label');
    noPriorityLabel.setAttribute('for', 'none');
    noPriorityLabel.textContent = 'None';
    labelDiv.appendChild(noPriority);
    labelDiv.appendChild(noPriorityLabel);

    const lowPriority = makeRadioButton('Low');
    lowPriority.setAttribute('id', 'low');
    const lowPriorityLabel = document.createElement('label');
    lowPriorityLabel.setAttribute('for', 'low');
    lowPriorityLabel.textContent = 'Low';
    labelDiv.appendChild(lowPriority);
    labelDiv.appendChild(lowPriorityLabel);

    const medPriority = makeRadioButton('Medium');
    medPriority.setAttribute('id', 'medium');
    const medPriorityLabel = document.createElement('label');
    medPriorityLabel.setAttribute('for', 'medium');
    medPriorityLabel.textContent = 'Medium';
    labelDiv.appendChild(medPriority);
    labelDiv.appendChild(medPriorityLabel);

    const highPriority = makeRadioButton('High');
    highPriority.setAttribute('id', 'high');
    const highPriorityLabel = document.createElement('label');
    highPriorityLabel.setAttribute('for', 'high');
    highPriorityLabel.textContent = 'High';
    labelDiv.appendChild(highPriority);
    labelDiv.appendChild(highPriorityLabel);
    
    radioDiv.appendChild(labelDiv);

    return radioDiv;
}

function makeRadioButton(value) {
    const radioBtn = document.createElement('input');
    radioBtn.type = 'radio';
    radioBtn.name = 'priority';
    radioBtn.required = 'true';
    radioBtn.value = value;

    return radioBtn;
}

function cancel(e) {
    const parentDiv = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
    parentDiv.classList.add('hidden');
}

export default makeForm;