import toggleTheme from '../src/theme-toggle';
import makeForm from '../src/load-form';
import makeProjectForm from './load-project-form';
import { initializeLocalStorage } from './local-storage-functionality';
import { displayProjectTabs, loadAllTab, loadHighPriorityTab, loadTodayTab, loadWeekTab, loadWeekPlusTab } from './tab-functionality';

((function() {
    initializeLocalStorage();
    displayProjectTabs();
    //set default theme on load (day) and default page is all tasks
    (function() {
        const root = document.documentElement;
        root.classList.add('day');
        const themeBtn = document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

        loadAllTab();
    })();

    const homeBtn = document.getElementById('home').addEventListener('click', loadAllTab);
    const toggleSidebarBtn = document.getElementById('view-toggle-btn').addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('hidden')) {
            sidebar.classList.remove('hidden');
        } else {
            sidebar.classList.add('hidden');
        }
    })

    //set functionality to navigate other tabs
    const allBtn = document.getElementById('all-btn').addEventListener('click', loadAllTab);
    const importantBtn = document.getElementById('high-priority-btn').addEventListener('click', loadHighPriorityTab);
    const todayBtn = document.getElementById('today-btn').addEventListener('click', loadTodayTab);
    const weekBtn = document.getElementById('week-btn').addEventListener('click', loadWeekTab);
    const weekPlusBtn = document.getElementById('week-plus-btn').addEventListener('click', loadWeekPlusTab);

    const modal = document.getElementById('task-modal');
    const taskForm = makeForm();
    modal.appendChild(taskForm);

    const addTaskBtn = document.getElementById('add-task-btn').addEventListener('click', () => {
        const overlay = document.getElementById('task-overlay');
        overlay.classList.remove('hidden');
    });

    const projectDiv = document.getElementById('project-add-div');
    const projectForm = makeProjectForm();
    projectForm.classList.add('hidden');
    projectDiv.appendChild(projectForm);
    const addProjectBtn = document.getElementById('add-project-btn');
    addProjectBtn.addEventListener('click', function() {
        projectForm.classList.remove('hidden');
        addProjectBtn.classList.add('hidden');
    })
}))();




