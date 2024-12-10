// script.js

// Load tasks from local storage when the page loads
window.onload = loadTasks;

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value;
    const category = document.getElementById('category').value;

    if (taskValue.trim() === "") return;

    const task = { text: taskValue, category: category, completed: false };
    addTaskToDOM(task);
    saveTask(task);

    taskInput.value = "";
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    if (task.completed) {
        li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        updateTasks();
        moveTask(task, li);
    });

    const textNode = document.createTextNode(task.text + " (" + task.category + ")");

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        li.remove();
        removeTask(task);
    });

    li.appendChild(checkbox);
    li.appendChild(textNode);
    li.appendChild(deleteButton);

    document.getElementById(task.completed ? 'doneTasks' : 'pendingTasks').appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTasks() {
    let tasks = [];
    document.querySelectorAll('li').forEach(li => {
        const task = {
            text: li.childNodes[1].nodeValue,
            category: li.childNodes[1].nodeValue.split(" (")[1].slice(0, -1),
            completed: li.childNodes[0].checked
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function moveTask(task, li) {
    const targetList = task.completed ? 'doneTasks' : 'pendingTasks';
    document.getElementById(targetList).appendChild(li);
}

function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskToRemove.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
