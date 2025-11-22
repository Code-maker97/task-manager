// Select Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from Local Storage on startup
document.addEventListener('DOMContentLoaded', loadTasks);

// Add Task Event
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value;
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(taskText);
    saveTaskToLocal(taskText);
    taskInput.value = ''; // Clear input
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.textContent = text;

    // Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
        removeTaskFromLocal(text);
    };

    // Click to Toggle Complete
    li.addEventListener('click', (e) => {
        if(e.target !== deleteBtn && e.target.parentElement !== deleteBtn) {
            li.classList.toggle('completed');
        }
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// --- Local Storage Functions ---

function saveTaskToLocal(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        createTaskElement(task);
    });
}

function removeTaskFromLocal(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Filter out the deleted task
    // Note: This simple version removes the first matching text. 
    // In a complex app, you'd use unique IDs.
    const taskIndex = tasks.indexOf(task);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}