// this is for simulating a db using objects

const db = {
  todos: [
    {
      id: 1,
      text: "buy milk",
      completed: true
    },
    {
      id: 2,
      text: "buy eggs",
      completed: true
    },
    {
      id: 3,
      text: "buy flour",
      completed: false
    },
    {
      id: 4,
      text: "buy sugar",
      completed: false
    },
    {
      id: 5,
      text: "make pancakes",
      completed: false
    },
  ]
}

module.exports = db
