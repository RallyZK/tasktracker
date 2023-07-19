const taskInput = document.getElementById("description");
const addButton = document.getElementById("add-task-btn");
const taskUL = document.querySelector(".tasks-ul");
const removedTasksUl = document.querySelector(".removed-tasks-ul");
let taskli = document.querySelectorAll(".task-li");

let tasksList = [];

addButton.addEventListener("click", function () {
  if (taskInput.value === "") return;
  addTask();
  console.log(tasksList);
});

function addTask() {
  let newTask = {
    task: taskInput.value,
    done: false,
    id: Date.now(),
  };
  tasksList.push(newTask);
  renderTask(newTask);
  taskInput.value = "";
}

taskUL.addEventListener("click", deleteTask);
taskUL.addEventListener("click", completeTask);


function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;
  const parentNode = event.target.closest(".task-li");
  console.log(parentNode);
  const id = Number(parentNode.id);
  parentNode.remove();
  removedTasksUl.appendChild(parentNode);

  const index = tasksList.findIndex(function (task) {
    if (task.id === id) {
      return true;
    }
  });
  tasksList.splice(index, 1);
}

function completeTask(event) {
  if (event.target.dataset.action !== "done") return;
  const parentNode = event.target.closest(".task-li");
  const id = Number(parentNode.id);

  const task = tasksList.find(function (task) {
    if (task.id === id) {
      return true;
    }
  });

  task.done = !task.done;
  parentNode.querySelector(".task-item").classList.toggle("checked");
  parentNode.classList.toggle("checked-div");
}

removedTasksUl.addEventListener('click', returnTask);

function returnTask(event) {
  const parentNode = event.target.closest(".task-li");
  const id = Number(parentNode.id);

  const task = tasksList.find(function (task) {
    if (task.id === id) {
      return true;
    }
  });
  parentNode.remove();
  taskUL.appendChild(parentNode);
}


function renderTask(task) {
  const cssClass = task.done ? "task-item checked" : "task-item";
  const cssClassDiv = task.done ? "task-li checked" : "task-li";

  let taskHTML = `
  <li class="${cssClassDiv}" id="${task.id}">
    <div class="${cssClass}">${task.task}</div>
      <div class="buttons">
      <button class="doneBtn" data-action="done" />Выполнено</button>
      <button class="deleteBtn" data-action="delete">Удалить</button>
    </div>
  </li>
  `;
  taskUL.insertAdjacentHTML("afterbegin", taskHTML);
}
