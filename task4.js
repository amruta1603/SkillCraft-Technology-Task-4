const taskInput = document.getElementById('taskTitle');
const timeInput = document.getElementById('taskTime');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<li>No tasks added yet.</li>';
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    li.innerHTML = `
      <div>
        <input type="checkbox" data-index="${index}" ${task.done ? 'checked' : ''} />
        <strong>${task.title}</strong> — ${task.datetime}
      </div>
      <button class="deleteBtn" data-index="${index}">✖</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const title = taskInput.value.trim();
  const datetime = timeInput.value;

  if (!title || !datetime) {
    alert('Please enter both task and date/time.');
    return;
  }

  tasks.push({
    title,
    datetime,
    done: false
  });

  taskInput.value = '';
  timeInput.value = '';
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addBtn.addEventListener('click', addTask);

taskList.addEventListener('click', (e) => {
  const index = e.target.dataset.index;

  if (e.target.tagName === 'INPUT') {
    toggleTask(index);
  }

  if (e.target.classList.contains('deleteBtn')) {
    deleteTask(index);
  }
});

renderTasks();
