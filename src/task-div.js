import { refreshDisplay, getCurrentTab } from "./tab-functionality";

function makeTaskDiv(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-div');

    const leftHalf = document.createElement('div');
    leftHalf.classList.add('left-half');

    const checkBox = makeCheckBox();
    checkBox.classList.add('checkbox');
    checkBox.addEventListener('click', function() {
        if (taskDiv.classList.contains('completed-task')) {
            checkBox.textContent = '';
            taskDiv.classList.remove('completed-task');
        } else {
            checkBox.textContent = '✓';
            taskDiv.classList.add('completed-task');
        }
    })

    leftHalf.appendChild(checkBox);
    leftHalf.appendChild(makeTaskDescription(task.getName()));
    taskDiv.appendChild(leftHalf);

    const rightHalf = document.createElement('div');
    rightHalf.classList.add('right-half');

    const deleteButton = makeDeleteButton();
    deleteButton.addEventListener('click', function() {
        localStorage.setItem(task.getKey(), 'deleted');
        refreshDisplay(getCurrentTab());
    });

    rightHalf.appendChild(makeTaskDate(task.getReadableDate()));
    rightHalf.appendChild(deleteButton);
    taskDiv.appendChild(rightHalf);

    switch (task.getPriority()) {
        case 'None': taskDiv.style.borderLeftColor = 'gray';
            break;
        case 'Low': taskDiv.style.borderLeftColor = 'green';
            break;
        case 'Medium': taskDiv.style.borderLeftColor = 'orange';
            break;
        case 'High': taskDiv.style.borderLeftColor = 'red';
            break;
    }

    return taskDiv;
}

function makeCheckBox() {
    const checkBox = document.createElement('button');
    checkBox.classList.add('check-box');

    return checkBox;
}

function makeTaskDescription(description) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = description.replace(/\\n/g, ' ');

    return descriptionDiv;
}

function makeTaskDate(taskDate) {
    const dateDiv = document.createElement('div');
    dateDiv.textContent = taskDate === '' ? 'No Due Date' : taskDate;

    return dateDiv;
}

function makeDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');

    return deleteButton;
}

export default makeTaskDiv;
