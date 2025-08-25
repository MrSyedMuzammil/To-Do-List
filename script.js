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
    const task = taskArray[i];
    const completedClass = task.completed ? "completed" : "";
    listItems += `
      <li class="task-item ${completedClass}" data-index="${i}">
        <span class="task-text">${task.text}</span>
        <span class="delete-task-btn" data-index="${i}">&times;</span>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

function addTask() {
  const taskText = inputEl.value.trim();
  if (taskText === "") {
    return;
  }
  tasks.push({ text: taskText, completed: false });
  inputEl.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
}

function toggleTaskCompletion(index) {
  if (tasks[index]) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  }
}

function deleteTask(index) {
  if (tasks[index]) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  }
}

ulEl.addEventListener("click", function (event) {
  const target = event.target;

  if (target.matches(".delete-task-btn")) {
    const index = parseInt(target.getAttribute("data-index"), 10);
    deleteTask(index);
    return;
  }

  const taskItem = target.closest(".task-item");
  if (taskItem) {
    const index = parseInt(taskItem.getAttribute("data-index"), 10);
    toggleTaskCompletion(index);
  }
});

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
