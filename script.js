const API_URL = 'http://localhost:3001/tasks';

async function addTask() {

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

    function addTask() {
        const taskInput = document.getElementById('task-input');
        const taskContainer = document.getElementById('task-container');

        if (taskInput.value.trim() !== '') {
            const task = document.createElement('div');
            task.className = 'task';
            task.innerHTML = `
      <span onclick="toggleTaskStatus(this)">${taskInput.value}</span>
      <button onclick="editTask(this)">Editar</button>
      <button onclick="removeTask(this)">Remover</button>
    `;
            taskContainer.appendChild(task);
            saveTasksToLocalStorage();
            taskInput.value = '';
        }
    }

    function toggleTaskStatus(span) {
        span.classList.toggle('completed');
        saveTasksToLocalStorage();
    }

    function removeTask(button) {
        const taskContainer = document.getElementById('task-container');
        const task = button.parentNode;
        taskContainer.removeChild(task);
        saveTasksToLocalStorage();
    }

    function editTask(button) {
        const task = button.parentNode;
        const span = task.querySelector('span');
        const newText = prompt('Editar Tarefa:', span.innerText);

        if (newText !== null && newText.trim() !== '') {
            span.innerText = newText;
            saveTasksToLocalStorage();
        }
    }

    function saveTasksToLocalStorage() {
        const tasks = document.querySelectorAll('.task');
        const tasksData = [];

        tasks.forEach((task) => {
            const taskText = task.querySelector('span').innerText;
            const isCompleted = task.querySelector('span').classList.contains('completed');
            tasksData.push({ text: taskText, completed: isCompleted });
        });

        localStorage.setItem('tasks', JSON.stringify(tasksData));
    }

    function loadTasksFromLocalStorage() {
        const taskContainer = document.getElementById('task-container');
        const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];

        tasksData.forEach((taskData) => {
            const task = document.createElement('div');
            task.className = 'task';
            task.innerHTML = `
      <span onclick="toggleTaskStatus(this)" ${taskData.completed ? 'class="completed"' : ''}>${taskData.text}</span>
      <button onclick="editTask(this)">Editar</button>
      <button onclick="removeTask(this)">Remover</button>
    `;
            taskContainer.appendChild(task);
        });
    }

    const taskData = { text: taskInput.value, completed: false };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar tarefa.');
        }

        const responseData = await response.json();
        taskData.id = responseData.id;

        // Adicione a tarefa ao DOM
        // ...
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function removeTask(button) {
    const task = button.parentNode;
    const taskId = task.dataset.id;

    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao remover tarefa.');
        }

        // Remova a tarefa do DOM
        // ...
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function loadTasksFromServer() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao carregar tarefas.');
        }

        const tasksData = await response.json();
        const taskContainer = document.getElementById('task-container');
        taskContainer.innerHTML = '';

        tasksData.forEach((taskData) => {
            const task = document.createElement('div');
            task.className = 'task';
            task.dataset.id = taskData.id;
            task.innerHTML = `
        <span onclick="toggleTaskStatus(this)" ${taskData.completed ? 'class="completed"' : ''}>
          ${taskData.text}
        </span>
        <button onclick="editTask(this)">Editar</button>
        <button onclick="removeTask(this)">Remover</button>
      `;
            taskContainer.appendChild(task);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

loadTasksFromServer();
