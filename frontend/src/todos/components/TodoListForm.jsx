import React, { useCallback } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useDataContext } from '../../DataContext'

export const TodoListForm = () => {
  const {
    isLoading,
    activeList,
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useDataContext();

  const handleAddTodo = useCallback((event) => {
    event.preventDefault()
    addTodo({ text: '' })
  }, [addTodo])

  const handleDeleteTodo = useCallback((todo) => (event) => {
    event.preventDefault()
    deleteTodo(todo);
  }, [deleteTodo])

  const handleUpdateTodoText = useCallback((todo) => (event) => {
    event.preventDefault()
    const updatedTodo = { ...todo, text: event.target.value }
    updateTodo(updatedTodo);
  }, [updateTodo])

  const handleUpdateTodoStatus = useCallback((todo) => (event) => {
    event.preventDefault()
    const updatedTodo = { ...todo, done: event.target.checked }
    updateTodo(updatedTodo);
  }, [updateTodo])

  if (isLoading || !activeList) return null

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{activeList.title}</Typography>
        <form
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo) => (
            <div key={todo.id} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {todo.id}
              </Typography>
              <Checkbox
                checked={todo.done}
                onChange={handleUpdateTodoStatus(todo)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.text}
                onChange={handleUpdateTodoText(todo)}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={handleDeleteTodo(todo)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={handleAddTodo}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
