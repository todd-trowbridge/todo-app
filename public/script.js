// render todos
function renderTodos(todosArray) {
  const todosHTMLArray = todosArray.map((todo) => {
    return `<li class="${todo.completed ? "completed" : "incomplete"}">
    ${todo.text}
    <button class="complete-button" data-id="${todo.id}" 
      data-completed="${todo.completed ? "completed" : "incomplete"}">e</button>
    <button class="delete-button" data-id="${todo.id}">x</button>
    </li>`;
  });
  return todosHTMLArray.join("");
}

const todos = document.getElementById("todos");
const todoForm = document.getElementById("todoForm");

function fetchTodos() {
  fetch("/api/v1/todos")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      todos.innerHTML = renderTodos(data);
    });
}

fetchTodos();

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("todo_text");
  fetch("/api/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: input.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      fetchTodos();
      todoForm.reset();
    });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const id = e.target.dataset.id;
    // delete behavior
    fetch(`/api/v1/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => !res.ok && res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        }
        fetchTodos();
      });
  }
  if (e.target.classList.contains("complete-button")) {
    const id = e.target.dataset.id;
    const completed = e.target.dataset.completed;
    // delete behavior
    fetch(`/api/v1/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: completed === "completed" ? false : true,
      }),
    })
      .then((res) => !res.ok && res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        }
        fetchTodos();
      });
  }
});
