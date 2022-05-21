let todoList = [];

let appendTodoFromInput = () => {
  let element = document.querySelector("#new-todo");

  let todo = element.value;

  if (!todo) {
    return;
  }

  todoList.push(todo);

  rebuildTodoList();

  element.value = "";
};

let removeTodoFromButton = (element) => {
  let idxToRemove = element.target.parentElement.dataset.idx;

  todoList.splice(idxToRemove, 1);

  rebuildTodoList();
};

rebuildTodoList = () => {
  html = "";

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
