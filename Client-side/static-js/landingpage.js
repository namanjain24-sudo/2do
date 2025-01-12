const addTodoInput = document.getElementById("new-todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");
const todoStats = document.getElementById("todo-stats");

let todos = [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.className = `todo-item ${todo.completed ? "completed" : ""}`;

    const todoLeft = document.createElement("div");
    todoLeft.className = "todo-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(index));

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    todoLeft.appendChild(checkbox);
    todoLeft.appendChild(todoText);
    todoItem.appendChild(todoLeft);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
  });

  updateStats();
}

function addTodo() {
  const todoText = addTodoInput.value.trim();
  if (todoText === "") {
    alert("Please enter a todo");
    return;
  }

  todos.push({ text: todoText, completed: false });
  addTodoInput.value = "";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function updateStats() {
  const itemsLeft = todos.filter(todo => !todo.completed).length;
  todoStats.textContent = `${itemsLeft} item${itemsLeft !== 1 ? "s" : ""} left`;
}
addTodoBtn.addEventListener("click", addTodo);

addTodoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
renderTodos();
