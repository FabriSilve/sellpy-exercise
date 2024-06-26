const data = [
  {
    id: 'L1',
    title: 'First List',
    todos: [{
      id: `${Date.now()}`,
      done: false,
      text: 'First todo of first list!'
    }],
  }, {
    id: 'L2',
    title: 'Second List',
    todos: [{
      id: `${Date.now() + 1}`,
      done: false,
      text: 'First todo of second list!',
    }],
  }
];

const getLists = () => {
  return data.map((list) => ({
    id: list.id,
    title: list.title,
    done: list.todos.every((todo) => todo.done),
  }))
}

const getTodos = (listId) => {
  const list = data.find((list) => list.id === listId);
  return list ? list.todos : [];
}

const addTodo = (listId, todo) => {
  const list = data.find((list) => list.id === listId);
  list.todos.push({ ...todo, id: `${Date.now()}`, done: false });
  return list.todos;
}

const removeTodo = (listId, todoId) => {
  const list = data.find((list) => list.id === listId);
  list.todos = list.todos.filter((todo) => todo.id !== todoId);
  return list.todos;
}

const updateTodo = (listId, updatedTodo) => {
  const list = data.find((list) => list.id === listId);
  list.todos = list.todos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo);
  return list.todos;
}

module.exports = {
  getLists,
  getTodos,
  addTodo,
  removeTodo,
  updateTodo,
}
