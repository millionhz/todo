const inputForm = document.querySelector('form');
const todoList = document.querySelector('ul');

function getTodoList() {
  let todoItems = localStorage.getItem('todoList');

  if (todoItems) {
    return JSON.parse(todoItems);
  }
  return [];
}

function setTodoList(todoItems) {
  localStorage.setItem('todoList', JSON.stringify(todoItems));
}

function _getListGroupItem(todoItemText, todoItemIdx) {
  const textElement = document.createElement('p');
  textElement.setAttribute('class', 'mx-0 my-0 text-start text-break pe-2');
  textElement.textContent = todoItemText;

  const buttonElement = document.createElement('button');
  buttonElement.setAttribute('class', 'btn btn-outline-danger btn-sm');
  buttonElement.setAttribute('type', 'button');
  buttonElement.setAttribute('title', 'delete-todo');
  buttonElement.textContent = 'Delete';

  const todoItem = document.createElement('ul');
  todoItem.setAttribute(
    'class',
    'list-group-item d-flex justify-content-between align-items-center'
  );
  todoItem.setAttribute('data-idx', todoItemIdx);
  todoItem.setAttribute('draggable', 'true');

  todoItem.appendChild(textElement);
  todoItem.appendChild(buttonElement);

  return todoItem;
}

function rebuildTodoList() {
  let todoListArr = getTodoList();

  todoList.innerHTML = '';
  for (const [idx, content] of todoListArr.entries()) {
    todoList.appendChild(_getListGroupItem(content, idx));
  }
}

function appendTodoListItem(todoItemText) {
  if (!todoItemText) {
    return;
  }
  const todoListArr = getTodoList();
  todoListArr.push(todoItemText);
  setTodoList(todoListArr);

  const todoListItem = _getListGroupItem(todoItemText, todoListArr.length - 1);
  todoList.appendChild(todoListItem);
}

function removeTodoListItem(idxToRemove) {
  let todoListArr = getTodoList();

  todoListArr.splice(idxToRemove, 1);
  setTodoList(todoListArr);

  rebuildTodoList();
}

function rearrangeTodoListItems(from, to) {
  const todoListArr = getTodoList();

  const todoListItem = todoListArr.splice(from, 1);
  todoListArr.splice(to, 0, todoListItem);

  setTodoList(todoListArr);

  rebuildTodoList();
}

function _manageTodoInputEvent() {
  const todoItem = inputForm.todo.value;
  appendTodoListItem(todoItem);

  inputForm.reset();
}

window.onfocus = rebuildTodoList;

document.addEventListener('DOMContentLoaded', () => {
  rebuildTodoList();
});

inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  _manageTodoInputEvent();
});

todoList.addEventListener('click', (event) => {
  if (event.target.title === 'delete-todo') {
    removeTodoListItem(event.target.parentElement.dataset.idx);
  }
});

todoList.addEventListener('dragstart', (event) => {
  if (event.target.nodeName === 'UL') {
    event.dataTransfer.setData('text/plain', event.target.dataset.idx);
    event.target.classList.add('list-group-item-primary');
  }
});

todoList.addEventListener('dragend', (event) => {
  if (event.target.nodeName === 'UL') {
    event.target.classList.remove('active');
    event.target.classList.remove('list-group-item-primary');
  }
});

todoList.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';

  if (event.target.nodeName === 'UL') {
    event.target.classList.add('active');
  }
});

todoList.addEventListener('dragleave', (event) => {
  if (event.target.nodeName === 'UL') {
    event.target.classList.remove('active');
  }
});

todoList.addEventListener('drop', (event) => {
  event.preventDefault();

  const from = event.dataTransfer.getData('text/plain');
  let to = null;

  if (event.target.nodeName === 'UL') {
    to = event.target.dataset.idx;
  } else {
    to = event.target.parentElement.dataset.idx;
  }

  if (from !== to) {
    rearrangeTodoListItems(from, to);
  }
});
