let tasks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

if (tasksFromLocalStorage) {
  tasks = tasksFromLocalStorage;
  renderTasks(tasks);
}

function renderTasks(taskArray) {
  let listItems = "";
  for (let i = 0; i < taskArray.length; i++) {
    listItems += `<li>${taskArray[i]}</li>`;
  }
  ulEl.innerHTML = listItems;
}

function addTask() {
  const taskText = inputEl.value.trim();
  if (taskText === "") {
    return;
  }
  tasks.push(taskText);
  inputEl.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
}

inputBtn.addEventListener("click", addTask);

inputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  tasks = [];
  renderTasks(tasks);
});
