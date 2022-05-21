function getTodoList() {
  todoList = localStorage.getItem("todoList");

  if (todoList) {
    return todoList.split(",");
  }
  return [];
}

function setTodoList(list) {
  localStorage.setItem("todoList", list);
}

function appendTodoFromInput() {
  let element = document.querySelector("#new-todo");

  let todoItems = element.value;

  if (!todoItems) {
    return;
  }

  let todoList = getTodoList();

  todoItems.split(",").forEach((element) => {
    if (element) {
      todoList.push(element);
    }
  });

  setTodoList(todoList);

  rebuildTodoList();

  element.value = "";
}

function removeTodoFromButton(element) {
  let idxToRemove = element.target.parentElement.dataset.idx;
  let todoList = getTodoList();

  todoList.splice(idxToRemove, 1);
  setTodoList(todoList);

  rebuildTodoList();
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

window.onload = () => {
  rebuildTodoList();
};

document
  .querySelector("#add-todo-button")
  .addEventListener("click", (element) => {
    appendTodoFromInput();
  });

document.querySelector("#new-todo").addEventListener("keypress", (element) => {
  if (element.key === "Enter") {
    appendTodoFromInput();
  }
});

document.querySelector("ul").addEventListener("click", (element) => {
  if (element.target.nodeName === "BUTTON") {
    removeTodoFromButton(element);
  }
});
