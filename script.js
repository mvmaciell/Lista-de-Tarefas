function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskContainer = document.getElementById('task-container');

    if (taskInput.value.trim() !== '') {
        const task = document.createElement('div');
        task.className = 'task';
        task.innerHTML = `
      <span>${taskInput.value}</span>
      <button onclick="removeTask(this)">Remover</button>
    `;
        taskContainer.appendChild(task);
        taskInput.value = '';
    }
}

function removeTask(button) {
    const taskContainer = document.getElementById('task-container');
    const task = button.parentNode;
    taskContainer.removeChild(task);
}
