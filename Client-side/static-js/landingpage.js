const addTodoInput = document.getElementById('new-todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const todoStats = document.getElementById('todo-stats');

function updateStats() {
  const remainingItems = document.querySelectorAll(
    '.todo-item:not(.completed)'
  ).length;
  todoStats.textContent = `${remainingItems} items left`;
}
function createTodoItem(text, isCompleted = false) {
  const todoId = `todo-${Date.now()}`;

  const todoItem = document.createElement('div');
  todoItem.className = `todo-item ${isCompleted ? 'completed' : ''}`;
  todoItem.id = todoId;

  const todoLeft = document.createElement('div');
  todoLeft.className = 'todo-left';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.checked = isCompleted;
  checkbox.addEventListener('change', () => {
    todoItem.classList.toggle('completed');
    updateStats();
  });

  const todoText = document.createElement('span');
  todoText.className = 'todo-text';
  todoText.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    todoItem.remove();
    updateStats();
  });

  todoLeft.appendChild(checkbox);
  todoLeft.appendChild(todoText);
  todoItem.appendChild(todoLeft);
  todoItem.appendChild(deleteBtn);

  return todoItem;
}

addTodoBtn.addEventListener('click', () => {
  const todoText = addTodoInput.value.trim();

  if (todoText !== '') {
    const newTodoItem = createTodoItem(todoText);
    todoList.appendChild(newTodoItem);
    addTodoInput.value = '';
    updateStats();
  } else {
    alert('Please enter a todo item.');
  }
});
const todoItems = document.querySelectorAll('.todo-item');
todoItems.forEach((todoItem) => {
  const checkbox = todoItem.querySelector('.todo-checkbox');
  const deleteBtn = todoItem.querySelector('.delete-btn');

  checkbox.addEventListener('change', () => {
    todoItem.classList.toggle('completed');
    updateStats();
  });

  deleteBtn.addEventListener('click', () => {
    todoItem.remove();
    updateStats();
  });
});
updateStats();
