const addButton = document.querySelector("#add-todo-button");
const inputField = document.querySelector("#new-todo");
const todoList = document.querySelector("ul");

function getTodoList() {
  let todoItems = localStorage.getItem("todoList");

  if (todoItems) {
    return JSON.parse(todoItems);
  }
  return [];
}

function setTodoList(todoItems) {
  localStorage.setItem("todoList", JSON.stringify(todoItems));
}

function _getListGroupItem(todoItemText, todoItemIdx) {
  const textElement = document.createElement("p");
  textElement.setAttribute("class", "mx-0 my-0 text-start text-break pe-2");
  textElement.textContent = todoItemText;

  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("class", "btn btn-outline-danger btn-sm");
  buttonElement.setAttribute("type", "button");
  buttonElement.setAttribute("name", "delete-todo");
  buttonElement.textContent = "Delete";

  const todoItem = document.createElement("ul");
  todoItem.setAttribute(
    "class",
    "list-group-item d-flex justify-content-between align-items-center"
  );

  todoItem.appendChild(textElement);
  todoItem.appendChild(buttonElement);

  return todoItem;
}

function rebuildTodoList() {
  let todoListArr = getTodoList();

  todoList.innerHTML = "";
  for (let i = 0; i < todoListArr.length; i++) {
    todoList.innerHTML += _getListGroupItem(todoListArr[i], i).outerHTML;
  }
}

function appendTodoList(todoItem) {
  const todoListArr = getTodoList();

  if (todoItem) {
    todoListArr.push(todoItem);
  }

  setTodoList(todoListArr);
  rebuildTodoList();
}

function removeTodoList(idxToRemove) {
  let todoListArr = getTodoList();

  todoListArr.splice(idxToRemove, 1);
  setTodoList(todoListArr);

  rebuildTodoList();
}

function _manageTodoInputEvent() {
  const todoItem = inputField.value;
  appendTodoList(todoItem);

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
