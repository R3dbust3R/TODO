// Select elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => addTaskToDOM(task));
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach((li) => {
    tasks.push({
      text: li.querySelector('.task-text').textContent,
      completed: li.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = task.completed ? 'completed' : '';
  
  const span = document.createElement('span');
  span.textContent = task.text;
  span.className = 'task-text';
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });
  
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove';
  removeBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });
  
  li.appendChild(span);
  li.appendChild(removeBtn);
  todoList.appendChild(li);
}

// Add new task
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText) {
    const task = { text: taskText, completed: false };
    addTaskToDOM(task);
    saveTasks();
    input.value = ''; // Clear input
  }
});

// Initialize app
loadTasks();
