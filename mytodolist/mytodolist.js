const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskListContainer = document.querySelector("#taskListContainer");

// use a new array to store the data I want.
let tasks = [];

// addBtn.addEventListener => to add a new task.
addBtn.addEventListener("click", () => {
  addNewTask(taskInput.value);
  taskInput.focus();
});

// taskInput.addEventListener => when user uses "Enter" key to add a new task.
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewTask(taskInput.value);
    taskInput.focus();
  }
});

// create addNewTask function and set the type of object for storing in localStorage.
function addNewTask(item) {
  if (item !== "") {
    const task = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    tasks.push(task);
    addToLocalStorage(tasks);
    taskInput.value = "";
  }
}

// create renderTasks function =>
function renderTasks(tasks) {
  // clear everything inside <ul>
  // without this: When you add a new task, it will appears again because localStorage has data.
  taskListContainer.innerHTML = "";

  tasks.forEach((item) => {
    // check if the item is completed
    const checked = item.completed ? "checked" : "unchecked";
    const li = document.createElement("li");
    // <li id="item" data-id="item.id"> </li>
    li.setAttribute("id", "item");
    li.setAttribute("data-id", item.id);
    // if item is completed, then add a class to <li> called "checked", which will add line-through style (see mytodolist.css)
    if (item.completed === true) {
      li.classList.add("checked");
      console.log(li);
    }
    li.innerHTML = `<input type="checkbox" class="checkBtn" ${checked}/>
    ${item.name}
    <i class="fa-solid fa-trash-can" id="delBtn"></i>`;
    taskListContainer.insertAdjacentElement("afterbegin", li);
  });
}

function addToLocalStorage(tasks) {
  // convert the array to string then store it.
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // render them to screen
  renderTasks(tasks);
}

// getFromLocalStorage() => get everything from localStorage.
function getFromLocalStorage() {
  const localStorageData = localStorage.getItem("tasks");
  // if localStorageData exists
  if (localStorageData) {
    // converts back to array and store it in tasks array
    tasks = JSON.parse(localStorageData);
    renderTasks(tasks);
  }
}
// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with id="taskListContainer" Because we need to listen for click event in all delBtn and checkbox
taskListContainer.addEventListener("click", (e) => {
  // check if the event is on checkbox
  if (e.target.type === "checkbox") {
    // use toggle function to make the ${checked} render.
    toggle(e.target.parentElement.getAttribute("data-id"));
  }
  // check if that is a delBtn by using .nodeName function.
  if (e.target.nodeName === "I") {
    // get id from data-id attribute's value of parent <li> where the delBtn is present
    deleteTask(e.target.parentElement.getAttribute("data-id"));
  }
});

// toggle the value to checked the value of completed is true or false.
function toggle(id) {
  tasks.forEach((item) => {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  // update the localStorage
  addToLocalStorage(tasks);
}

// deletes a task from tasks array, then updates localstorage and renders updated list to screen
function deleteTask(id) {
  // filters out the <li> with the id and updates the tasks array
  // use != not !==, because here types are different. One is number and other is string
  tasks = tasks.filter((item) => item.id != id);
  // update the localStorage
  addToLocalStorage(tasks);
}
