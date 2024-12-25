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

  document.getElementById("logout-btn").addEventListener("click", () => {
      alert("You have logged out.");
      location.reload();
  });
});


document.addEventListener("DOMContentLoaded", () => {
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
