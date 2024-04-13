const express = require('express')
const cors = require('cors')
const app = express()

const dataStorage = require('./dataStorage');

app.use(cors())
app.use(express.json())

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/list', (_req, res) => {
  res.json(dataStorage.getLists());
})

app.get('/list/:id/todo', (req, res) => {
  const { id } = req.params;
  res.json(dataStorage.getTodos(id));
})

app.post('/list/:id/todo', (req, res) => {
  const { id } = req.params;
  const todo = req.body;
  res.json(dataStorage.addTodo(id, todo));
})

app.delete('/list/:id/todo/:todoId', (req, res) => {
  const { id, todoId } = req.params;
  res.json(dataStorage.removeTodo(id, todoId));
})

app.put('/list/:id/todo/:todoId', (req, res) => {
  const { id, todoId } = req.params;
  if (todoId !== req.body.id) {
    res.status(400).json({ error: 'Todo id in path does not match todo id in body' });
  }
  const todo = req.body;
  res.json(dataStorage.updateTodo(id, todo));
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
