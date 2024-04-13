const data = [
  {
    id: '0000000001',
    title: 'First List',
    todos: [{
      id: '1',
      text: 'First todo of first list!'
    }],
  }, {
    id: '0000000002',
    title: 'Second List',
    todos: [{
      id: '1',
      text: 'First todo of second list!',
    }],
  }
];

const getLists = () => {
  return data.map((list) => ({ id: list.id, title: list.title }))
}

const getTodos = (listId) => {
  const list = data.find((list) => list.id === listId);
  return list ? list.todos : [];
}

const addTodo = (listId, todo) => {
  const list = data.find((list) => list.id === listId);
  list.todos.push({ ...todo, id: `${list.todos.length + 1}` });
  return list.todos;
}

const removeTodo = (listId, todoId) => {
  const list = data.find((list) => list.id === listId);
  list.todos = list.todos.filter((todo) => todo.id !== todoId);
  return list.todos;
}

module.exports = {
  getLists,
  getTodos,
  addTodo,
  removeTodo,
}
