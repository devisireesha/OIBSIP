// Get the necessary elements from the HTML
const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
    taskBox = document.querySelector(".task-box");

// Initialize variables
let editId,
    isEditTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list"));

// Add event listeners to the filter buttons
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

// Function to display the filtered tasks
function showTodo(filter) {
    let liTag = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                liTag += `<li class="task">
          <label for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
            <p class="${completed}">${todo.name}</p>
          </label>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="task-menu">
              <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
              <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
            </ul>
          </div>
        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    if (!checkTask.length) {
        clearAll.classList.remove("active");
    } else {
        clearAll.classList.add("active");
    }
    if (taskBox.offsetHeight >= 300) {
        taskBox.classList.add("overflow");
    } else {
        taskBox.classList.remove("overflow");
    }
}
showTodo("all");

// Function to show the task menu on ellipsis click
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

// Function to update task status
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// Function to edit a task
function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

// Function to delete a task
function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

// Event listener for the clear all button
clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
});

// Event listener for the task input
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key === "Enter" && userTask !== "") {
        if (!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});

// Event listener for the add button
addbtn.addEventListener("click", add);

// Function to add a new task
function add() {
    let userTask = taskInput.value.trim();
    if (userTask !== "") {
        if (!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    } else {
        alert("Please enter a task before adding.");
    }
}
