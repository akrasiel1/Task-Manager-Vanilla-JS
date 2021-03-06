// Defining variables for manipulation

let form, taskList, clearBtn, filter, taskInput;

form = document.querySelector("#task-form");
taskList = document.querySelector(".collection");
clearBtn = document.querySelector(".clear-tasks");
filter = document.querySelector("#filter");
taskInput = document.querySelector("#task");


// Load all event listeners

loadEventListeners();

function loadEventListeners() {

  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear all tasks event
  clearBtn.addEventListener("click", clearTasks);

  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
};

// Get tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  };

  tasks.forEach(function(task) {
    // Create li element
    let li = document.createElement("li");
    // Add a class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task.toUpperCase()));
    // Create new link element
    let link = document.createElement("a");
    // Add class to link
    link.className = "delete-item secondary-content";
    // Add FontAwesome delete icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  })
}

// Add task

function addTask(e) {

  // Prevent app from submitting empty value
  if(taskInput.value === "") {
    alert("Please insert correct value")
  }
  else {
    // Create li element
    let li = document.createElement("li");
    // Add a class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value.toUpperCase()));
    // Create new link element
    let link = document.createElement("a");
    // Add class to link
    link.className = "delete-item secondary-content";
    // Add FontAwesome delete icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store task in Local Storage
    storeTaskLocally(taskInput.value);

    // Clear input after submission
    taskInput.value = "";
  }

  // Prevent default behaviour 
  e.preventDefault();
}

// Store task

function storeTaskLocally(task) {
  let tasks;
  if(localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove individual task

function removeTask(e) {
  if(e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    // Remove tasks from Local Storage
    removeFromLS(e.target.parentElement.parentElement)
  }
}

// Remove task from Local Storage

function removeFromLS(taskItem) {
  let tasks;
  if(localStorage.getItem("tasks") === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks() {
  taskList.innerHTML = '';

  // Clear ALL  tasks from Local Storage
  clearAllFromLS();
}

// Clear ALL tasks from Local Storage
function clearAllFromLS() {
  localStorage.clear();
}

// Filter tasks

function filterTasks(e) {
  let text = e.target.value.toUpperCase();

  document.querySelectorAll(".collection-item").forEach(function(task){
    let item = task.firstChild.textContent;
    if(item.toUpperCase().indexOf(text) != -1){
      task.style.display = "block";
    }
    else {
      task.style.display = "none"
    }
  });
}