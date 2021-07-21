// require modules
const http = require("http");
const express = require("express");
const db = require("./model/db");

// server vars
const port = 3000;
const address = "127.0.0.1";

// set up server
const app = express();
const server = http.createServer(app);

// include middleware (static files, json, urlencode)
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get all todos
app.get("/api/v1/todos", (req, res) => {
  res.json(db.todos);
});

// create a new todo
app.post("/api/v1/todos", (req, res) => {
  if (!req.body || !req.body.text) {
    // respond with error
    res.json({
      error: "todo text required",
    });
    return;
  }
  const newTodo = {
    id: id++,
    text: req.body.text,
    completed: false,
  };
  db.todos.push(newTodo);
  res.status(201).json(newTodo);
});

// update existing todos by id
app.patch("/api/v1/todos/:id", (req, res) => {
  // get the id from the route
  const id = parseInt(req.params.id);
  // find the existing todo
  const todoIndex = db.todos.findIndex((todo) => {
    return todo.id === id;
  });
  // update the todo
  db.todos[todoIndex].text = req.body.text;
  // respond with updated item
  res.json(db.todos[todoIndex]);
});

// listen for requests
server.listen(3000, "127.0.0.1", () => {
  console.log(`Server Listening on http://${address}:${port}`);
});
