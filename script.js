document.addEventListener("DOMContentLoaded", () => {
    const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    const taskListElement = document.getElementById("task-list");
    const completedListElement = document.getElementById("completed-list");

    renderTasks();

    document.getElementById("add-task-btn").addEventListener("click", () => {
        const title = document.getElementById("task-title").value.trim();
        const date = document.getElementById("task-date").value;
        const priority = document.getElementById("task-priority").value;

        if (!title || !date) {
            alert("Please fill in all fields!");
            return;
        }

        const task = { title, date, priority, completed: false };
        taskList.push(task);
        saveToLocalStorage();
        renderTasks();

        document.getElementById("task-title").value = "";
        document.getElementById("task-date").value = "";
        document.getElementById("task-priority").value = "Low";
    });

    function renderTasks() {
        taskListElement.innerHTML = "";
        completedListElement.innerHTML = "";

        taskList.forEach((task, index) => {
            const taskElement = document.createElement("div");
            taskElement.className = `task-item ${task.completed ? "completed" : "incomplete"}`;

            taskElement.innerHTML = `
                <div>
                    <span>${task.title} - ${task.date}</span>
                    <span class="task-priority-${task.priority.toLowerCase()}">${task.priority}</span>
                </div>
                <div>
                    <button class="complete-btn" onclick="toggleTaskCompletion(${index})">
                        <span>${task.completed ? "🔄" : "✔️"}</span> 
                        ${task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button class="delete-btn" onclick="deleteTask(${index})">🗑️ Delete</button>
                </div>
            `;

            if (task.completed) {
                completedListElement.appendChild(taskElement);
            } else {
                taskListElement.appendChild(taskElement);
            }
        });
    }

    window.toggleTaskCompletion = function (index) {
        taskList[index].completed = !taskList[index].completed;
        saveToLocalStorage();
        renderTasks();
    };

    window.deleteTask = function (index) {
        taskList.splice(index, 1);
        saveToLocalStorage();
        renderTasks();
    };

    function saveToLocalStorage() {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }

    // Logout functionality
    document.getElementById("logout-btn").addEventListener("click", () => {
        sessionStorage.removeItem("currentUser");
        sessionStorage.setItem("loggedIn", "false");
        sessionStorage.setItem("alertShown", "false");
        localStorage.removeItem("taskList");
        alert("You have logged out.");

        // Replace history state and redirect to login page
        history.replaceState(null, null, "login.html");
        window.location.href = "login.html";
    });
});

// Ensure logged-out users cannot access protected pages
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = sessionStorage.getItem("currentUser");
    const loggedIn = sessionStorage.getItem("loggedIn");
    const alertShown = sessionStorage.getItem("alertShown");

    if (!currentUser || loggedIn === "false") {
        sessionStorage.setItem("loggedIn", "false");

        // Show alert only if it hasn't been shown before
        if (alertShown !== "true") {
            alert("You are not logged in. Redirecting to login page...");
            sessionStorage.setItem("alertShown", "true");
        }

        history.replaceState(null, null, "login.html");
        window.location.href = "login.html";
    }

    window.addEventListener("popstate", () => {
        history.pushState(null, null, window.location.href);

        if (!currentUser || loggedIn === "false") {
            // Ensure navigation alert is shown only once
            if (alertShown !== "true") {
                alert("Navigation is disabled. Please log in first!");
                sessionStorage.setItem("alertShown", "true");
            }
        }
    });

    history.pushState(null, null, window.location.href);
});

// Menu open/close functions
function openMenu() {
    const container = document.getElementById('container');
    const menu = document.getElementById('menu');

    container.style.right = '0%'; // Move container into view
    menu.style.opacity = '1'; // Fully visible menu content
}

function closeMenu() {
    const container = document.getElementById('container');
    const menu = document.getElementById('menu');

    container.style.right = '-100%'; // Move container out of view
    menu.style.opacity = '0'; // Hide menu content
}

// Dashboard rendering
document.addEventListener("DOMContentLoaded", () => {
    // Get current user from sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    // Check if a user is logged in
    if (currentUser) {
        // Update email and name in the DOM
        const emailElement = document.querySelector("p#email");  // Assuming you have a <p id="user-email"></p> in HTML
        const nameElement = document.querySelector("h3#name");  // Assuming you have a <h3 id="user-name"></h3> in HTML

        if (emailElement) {
            emailElement.textContent = currentUser.email;  // Set the email
        }

        if (nameElement) {
            nameElement.textContent = currentUser.name;  // Set the name
        }
    }

    const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    const inProgressTasksElement = document.querySelector(".task-list h3:nth-of-type(1) + .task-item");
    const notStartedTasksElement = document.querySelector(".task-list h3:nth-of-type(2) + .task-item");
    const completedTasksElement = document.querySelector(".completed-tasks");

    renderDashboardTasks();

    function renderDashboardTasks() {
        inProgressTasksElement.innerHTML = "";
        notStartedTasksElement.innerHTML = "";
        completedTasksElement.innerHTML = "";

        taskList.forEach((task) => {
            const taskElement = document.createElement("div");
            taskElement.className = "task-item";
            taskElement.innerHTML = `
                <h4>${task.title}</h4>
                <p>[${task.date}]</p>
                <p>Priority: ${task.priority} | Status: ${task.completed ? "Completed" : task.status || "Not Started"}</p>
            `;

            if (task.completed) {
                completedTasksElement.appendChild(taskElement);
            } else if (task.status === "In Progress") {
                inProgressTasksElement.appendChild(taskElement);
            } else {
                notStartedTasksElement.appendChild(taskElement);
            }
        });
    }
});

// Sign up/sign in functionality
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

const signUpForm = document.querySelector(".sign-up-container form");
const signInForm = document.querySelector(".sign-in-container form");

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signUpForm.querySelector("input[placeholder='Name']").value;
    const email = signUpForm.querySelector("input[placeholder='Email']").value;
    const password = signUpForm.querySelector("input[placeholder='Password']").value;

    if (!name || !email || !password) {
        alert("All fields are required for sign up!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("Email is already registered. Please use a different email or sign in.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign-up successful! You can now log in.");
    signUpForm.reset();
    container.classList.remove("right-panel-active");
});

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signInForm.querySelector("input[placeholder='Email']").value;
    const password = signInForm.querySelector("input[placeholder='Password']").value;

    if (!email || !password) {
        alert("Both email and password are required to log in!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        const loginData = JSON.parse(localStorage.getItem("logins")) || [];
        const loginTime = new Date().toLocaleString();
        loginData.push({ name: user.name, email: user.email, time: loginTime });
        localStorage.setItem("logins", JSON.stringify(loginData));

        sessionStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
        sessionStorage.setItem("loggedIn", "true");

        alert(`Welcome back, ${user.name}!\nLogin recorded at: ${loginTime}`);
        signInForm.reset();
        window.location.href = "Dashboard.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});