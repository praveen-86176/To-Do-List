document.getElementById('task-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const day = document.getElementById('day').value;
    const task = document.getElementById('task').value;
  
    if (task) {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task';
      taskDiv.textContent = task;
  
      const tasksContainer = document.getElementById(day);
      tasksContainer.appendChild(taskDiv);
  
      // Clear the input field
      document.getElementById('task').value = '';
    }
  });
  