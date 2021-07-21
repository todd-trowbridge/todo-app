// render todos
function renderTodos(todosArray){
  const todosHTMLArray = todosArray.map(todo => {
    return `<li class="${ todo.completed ? 'completed' : 'incomplete'}">${todo.text}</li>`
  })
  return todosHTMLArray.join('')
}

const todos = document.getElementById('todos')
fetch("/api/v1/todos")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    todos.innerHTML = renderTodos(data)
  });
