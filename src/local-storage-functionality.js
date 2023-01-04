import Task from "./Task";

function initializeLocalStorage() {
    if (localStorage.length === 0) {
        localStorage.setItem(0, '');
    }
}

function getStorageKey() {
    return localStorage.length;
}

function convertToTask(task) {
    let text = task.split('!$-')[1];
    let date = task.split('!$-')[3];
    let priority = task.split('!$-')[5];
    let project = task.split('!$-')[7];
    let key = task.split('!$-')[8].split(':')[1].replace('}', '');

    return new Task(text, date, priority, project, key);
}

function getTaskArray() {
    const taskArray = [];
    
    for (let i = 1; i < localStorage.length; i++) {
        let task = localStorage.getItem(i);
        if (task === 'deleted' || task === null) {
            continue;
        }
        
        const newTask = convertToTask(task);
        taskArray.push(newTask);
    }
    
    return taskArray;
}

function deleteProjects(project) {
    for (let i = 1; i < localStorage.length; i++) {
        let task = localStorage.getItem(i);
        if (task === 'deleted' || task === null) {
            continue;
        }
        const newTask = convertToTask(task);
        if (newTask.getProject() === project) {
            localStorage.setItem(i, 'deleted');
        }
    }
}

function getProjectsArray() {
    const projects = localStorage.getItem(0).split('!$-');
    return projects.filter(project => project.length > 0);
}


export { initializeLocalStorage, getStorageKey, getTaskArray, getProjectsArray, deleteProjects };