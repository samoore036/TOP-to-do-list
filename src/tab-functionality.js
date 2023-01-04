import { getProjectsArray, getTaskArray, deleteProjects } from "./local-storage-functionality";
import makeTaskDiv from '../src/task-div';

let currentTab = '';

function setCurrentTab(tab) {
    currentTab = tab;
}

function getCurrentTab() {
    return currentTab;
}

function hideTabs() {
    const tabs = Array.from(document.getElementsByClassName('tab'));
    tabs.forEach(tab => tab.classList.add('hidden'));
}

function resetButtons() {
    Array.from(document.querySelectorAll('button'))
        .forEach(btn => btn.classList.remove('active'));
}

function refreshDisplay(tab) {
    switch (tab) {
        case 'all-tab': loadAllTab();
            break;
        case 'high-priority-tab': loadHighPriorityTab();
            break;
        case 'today-tab': loadTodayTab();
            break;
        case 'week-tab': loadWeekTab();
            break;
        case 'week-plus-tab': loadWeekPlusTab();
            break;
        default: loadProjectTab(tab);
    }
}

function deleteProject() {
    const projects = localStorage.getItem(0);
    const updatedProjects = projects.replace(getCurrentTab(), '').toString();
    localStorage.setItem(0, updatedProjects);
    
    displayProjectTabs();
    deleteProjects(getCurrentTab());
    loadAllTab();
}

//filter for tasks that are not assigned to a project
function getTabTasks() {
    return getTaskArray().filter(task => task.getProject().includes('tab'));
}

function getProjectTasks(project) {
    return getTaskArray().filter(task => task.getProject() === project);
}

function loadAllTab() {
    hideTabs();
    resetButtons();
    setCurrentTab('all-tab');
    const tab = document.getElementById('all-tab');
    tab.classList.remove('hidden');

    const btn = document.getElementById('all-btn');
    btn.classList.add('active');

    const contentDiv = tab.getElementsByClassName('content-div')[0];
    contentDiv.textContent = '';

    if (localStorage.length >= 2) {
        getTabTasks().forEach(task => contentDiv.appendChild(makeTaskDiv(task)));
    }
}

function loadHighPriorityTab() {
    hideTabs();
    resetButtons();
    setCurrentTab('high-priority-tab');
    const tab = document.getElementById('high-priority-tab');
    tab.classList.remove('hidden');

    const btn = document.getElementById('high-priority-btn');
    btn.classList.add('active');

    const contentDiv = tab.getElementsByClassName('content-div')[0];
    contentDiv.textContent = '';

    if (localStorage.length >= 2) {
        getTabTasks().filter(task => task.getPriority() === 'High')
        .forEach(task => contentDiv.appendChild(makeTaskDiv(task)));
    }
}

function loadTodayTab() {
    hideTabs();
    resetButtons();
    setCurrentTab('today-tab');
    const tab = document.getElementById('today-tab');
    tab.classList.remove('hidden');

    const btn = document.getElementById('today-btn');
    btn.classList.add('active');

    const contentDiv = tab.getElementsByClassName('content-div')[0];
    contentDiv.textContent = '';

    if (localStorage.length >= 2) {
        getTabTasks().filter(task => task.getFullDate().getFullYear() == getToday().getFullYear()
        && task.getFullDate().getMonth() == getToday().getMonth()
        && task.getFullDate().getDate() == getToday().getDate())
        .forEach(task => contentDiv.appendChild(makeTaskDiv(task)));
    }
}

function loadWeekTab() {
    hideTabs();
    resetButtons();
    setCurrentTab('week-tab');
    const tab = document.getElementById('week-tab');
    tab.classList.remove('hidden');

    const btn = document.getElementById('week-btn');
    btn.classList.add('active');

    const contentDiv = tab.getElementsByClassName('content-div')[0];
    contentDiv.textContent = '';

    if (localStorage.length >= 2) {
        getTabTasks().filter(task => task.getFullDate() >= getToday() && task.getFullDate() <= getWeekOut())
        .forEach(task => contentDiv.appendChild(makeTaskDiv(task)));
    }
}

function loadWeekPlusTab() {
    hideTabs();
    resetButtons();
    setCurrentTab('week-plus-tab');
    const tab = document.getElementById('week-plus-tab');
    tab.classList.remove('hidden');

    const btn = document.getElementById('week-plus-btn');
    btn.classList.add('active');

    const contentDiv = tab.getElementsByClassName('content-div')[0];
    contentDiv.textContent = '';

    if (localStorage.length >= 2) {
        getTabTasks().filter(task => task.getFullDate() > getWeekOut())
        .forEach(task => contentDiv.appendChild(makeTaskDiv(task)));
    }
}

function loadProjectTab(project) {
    // const project = e.target.textContent;
    hideTabs();
    resetButtons();
    setCurrentTab(project);
    const tab = document.getElementById(project);
    tab.classList.remove('hidden');

    const contentDiv = tab.getElementsByClassName('content-div')[0];
    contentDiv.textContent = '';

    if (localStorage.length >= 2) {
        getProjectTasks(project).forEach(task => contentDiv.appendChild(makeTaskDiv(task)));
    }
}

function displayProjectTabs() {
    const projectsDiv = document.getElementById('projects-div');
    projectsDiv.textContent = '';

    getProjectsArray().forEach(project => projectsDiv.appendChild(makeProjectsTab(project)));
    getProjectsArray().forEach(project => (makeProjectTabDiv(project)));
}

function makeProjectsTab(projectName) {
    const button = document.createElement('button');
    button.textContent = projectName;
    button.classList.add('project-tab-btn');
    button.addEventListener('click', function(e) {
        loadProjectTab(e.target.textContent);
        button.classList.add('active');
    });

    return button;
}

function makeProjectTabDiv(projectName) {
    const div = document.createElement('div');
    div.classList.add('tab', 'hidden');
    div.setAttribute('id', projectName);

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header-div');

    const header = document.createElement('h1');
    header.textContent = projectName;
    headerDiv.appendChild(header);

    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.textContent = 'Delete project';
    deleteProjectBtn.classList.add('project-delete-btn');
    deleteProjectBtn.addEventListener('click', deleteProject);
    headerDiv.appendChild(deleteProjectBtn);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-div');
    
    div.appendChild(headerDiv);
    div.appendChild(contentDiv);
    
    const mainDiv = document.getElementById('main');
    mainDiv.appendChild(div);
}

function getToday() {
    //create a new date object first then make another date object so that hours/minutes/seconds defaults to 00:00:00
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function getWeekOut() {
    return new Date(getToday().getFullYear(), getToday().getMonth(), getToday().getDate() + 7);
}

export { setCurrentTab, getCurrentTab, hideTabs, refreshDisplay, displayProjectTabs, loadAllTab, loadHighPriorityTab, loadTodayTab, loadWeekTab, loadWeekPlusTab };