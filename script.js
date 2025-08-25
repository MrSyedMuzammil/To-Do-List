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
        ${task.text}
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

ulEl.addEventListener("click", function (event) {
  if (event.target && event.target.matches("li.task-item")) {
    const index = parseInt(event.target.getAttribute("data-index"), 10);
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
