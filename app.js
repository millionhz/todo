const addButton = document.querySelector("#add-todo-button");
const inputField = document.querySelector("#new-todo");
const todoList = document.querySelector("ul");

function getTodoList() {
  let todoItems = localStorage.getItem("todoList");

  if (todoItems) {
    return todoItems.split(",");
  }
  return [];
}

function setTodoList(todoItems) {
  localStorage.setItem("todoList", todoItems);
}

function rebuildTodoList() {
  let todoList = getTodoList();
  let html = "";

  for (let i = 0; i < todoList.length; i++) {
    html += `
    <li
    class="list-group-item d-flex justify-content-between align-items-center" data-idx= ${i} 
  >
    <p class="mx-0 my-0 text-start text-break pe-2">${todoList[i]}</p>
    <button type="button" class="btn btn-outline-danger btn-sm" name="delete-todo">Delete</button>
  </li>
  `;
  }

  document.querySelector("ul").innerHTML = html;
}

function appendTodoList(todoItem) {
  const todoList = getTodoList();

  if (todoItem) {
    todoList.push(todoItem);
  }

  setTodoList(todoList);
  rebuildTodoList();
}

function removeTodoList(idxToRemove) {
  let todoList = getTodoList();

  todoList.splice(idxToRemove, 1);
  setTodoList(todoList);

  rebuildTodoList();
}

function _getItemsFromInputField() {
  const todoItems = inputField.value;

  return todoItems.split(",").filter((element) => Boolean(element));
}

function _manageTodoInputEvent() {
  const todoItems = _getItemsFromInputField();

  for (const todoItem of todoItems) {
    appendTodoList(todoItem);
  }

  inputField.value = "";
}

window.onload = () => rebuildTodoList();
window.onfocus = () => rebuildTodoList();

addButton.addEventListener("click", () => _manageTodoInputEvent());

inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    _manageTodoInputEvent();
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    removeTodoList(event.target.parentElement.dataset.idx);
  }
});
