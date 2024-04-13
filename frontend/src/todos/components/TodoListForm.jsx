import React, { useCallback } from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

import { useDataContext } from '../../DataContext'

const TodoListForm = () => {
  const {
    isLoading,
    activeList,
    todos,
    addTodo,
    deleteTodo,
    updateTodoDelayed,
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
    updateTodoDelayed(updatedTodo);
  }, [updateTodoDelayed])

  const handleUpdateTodoStatus = useCallback((todo) => (event) => {
    event.preventDefault()
    const updatedTodo = { ...todo, done: event.target.checked }
    updateTodo(updatedTodo);
  }, [updateTodo])

  const handleUpdateTodoDue = useCallback((todo) => (date) => {
    const updatedTodo = { ...todo, due: date.format('DD/MM/YYYY') }
    updateTodo(updatedTodo);
  }, [updateTodo])

  if (isLoading || !activeList) return null

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{activeList.title}</Typography>
        <Box
          display='flex'
          flexDirection='column'
          flexGrow={1}
        >
          {todos.map((todo, index) => (
            <Box key={todo.id} display="flex" alignItems="center" >
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
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
              <DatePicker
                sx={{ marginTop: '1rem' }}
                label='Due day?'
                value={todo.due ? dayjs(todo.due, 'DD/MM/YYYY') : null}
                onChange={handleUpdateTodoDue(todo)}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={handleDeleteTodo(todo)}
              >
                <DeleteIcon />
              </Button>
            </Box>
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
        </Box>
      </CardContent>
    </Card>
  )
}

export default TodoListForm
