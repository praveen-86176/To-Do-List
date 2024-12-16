const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert('User already exists. Please sign in.');
    } else {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created successfully! Please sign in.');
    }
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'home.html';
    } else {
        alert('Invalid email or password.');
    }
});

window.onload = function () {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user && window.location.pathname === '/home.html') {
        document.getElementById('username').innerText = user.name;
        displayTasks();
    } else if (user) {
        window.location.href = 'home.html';
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

document.getElementById('logoutButton').addEventListener('click', logout);

document.getElementById('addTaskButton').addEventListener('click', function () {
    const newTask = document.getElementById('newTask').value;
    if (newTask) {
        const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
        taskList.push({ task: newTask, completed: false });
        localStorage.setItem('taskList', JSON.stringify(taskList));
        displayTasks();
        document.getElementById('newTask').value = '';
    }
});

function displayTasks() {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';
    taskList.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
        taskItem.innerHTML = `
            <span>${task.task}</span>
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskListElement.appendChild(taskItem);
    });
}

function toggleTask(index) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    displayTasks();
}

function deleteTask(index) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    displayTasks();
}
