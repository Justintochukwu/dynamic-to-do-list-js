// To-Do List script - with Local Storage support

document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn'); // "Add Task" button
  const taskInput = document.getElementById('task-input');   // input field for tasks
  const taskList = document.getElementById('task-list');     // ul element that displays tasks

  // Array to hold tasks
  let tasks = [];

  /**
   * Save tasks to Local Storage
   */
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  /**
   * Load tasks from Local Storage and render them
   */
  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      tasks.forEach(task => createTaskElement(task));
    }
  }

  /**
   * Create a task element and add it to the DOM
   * @param {string} taskText
   */
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Remove task from DOM, array, and Local Storage
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      tasks = tasks.filter(task => task !== taskText);
      saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  /**
   * addTask
   * Responsible for creating a new task item and appending it to the task list.
   * Also updates Local Storage.
   */
  function addTask(suppressEmptyAlert = false) {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      if (!suppressEmptyAlert) {
        alert('Please enter a task.');
      }
      return;
    }

    // Add to array and save
    tasks.push(taskText);
    saveTasks();

    // Add to DOM
    createTaskElement(taskText);

    // Clear input field
    taskInput.value = '';
  }

  // Event listeners
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from Local Storage when page loads
  loadTasks();
});
