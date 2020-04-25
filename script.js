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
  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);
};

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
    // Clear input after submission
    taskInput.value = "";
  }

  // Prevent default behaviour 
  e.preventDefault();
}

// Remove individual task

function removeTask(e) {
  if(e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
}