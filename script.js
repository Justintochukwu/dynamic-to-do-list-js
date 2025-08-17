// To-Do List script - follows the requested structure and naming exactly

// Ensure the DOM is fully loaded before running any code
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn'); // "Add Task" button
  const taskInput = document.getElementById('task-input'); // input field for tasks
  const taskList = document.getElementById('task-list');   // ul element that displays tasks

  /**
   * addTask
   * Responsible for creating a new task item and appending it to the task list.
   * If the input is empty, alerts the user (unless suppressed).
   *
   * @param {boolean} [suppressEmptyAlert=false] - when true, do not show alert for empty input (useful on load)
   */
  function addTask(suppressEmptyAlert = false) {
    // Retrieve and trim the value from the task input field
    const taskText = taskInput.value.trim();

    // If the trimmed text is empty, prompt the user (unless suppressed)
    if (taskText === '') {
      if (!suppressEmptyAlert) {
        alert('Please enter a task.');
      }
      return;
    }

    // Create a new li element and set its textContent
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button for the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Assign onclick to remove the li element from the taskList
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append the remove button to the li, then append the li to the task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
  }

  // Add event listener to addButton to call addTask on click
  addButton.addEventListener('click', function () {
    addTask();
  });

  // Add event listener to taskInput to add task when Enter is pressed
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Invoke addTask on DOMContentLoaded (suppress empty-alert to avoid a popup on load)
  addTask(true);
});
