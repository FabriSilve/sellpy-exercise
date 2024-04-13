import React from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useDataContext } from '../../DataContext'

export const TodoListForm = () => {
  const {
    isLoading,
    activeList,
    todos,
  } = useDataContext();

  if (isLoading || !activeList) return null

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{activeList.title}</Typography>
        <form
          onSubmit={() => null}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map((todo) => (
            <div key={todo.id} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {todo.id}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.text}
                onChange={(event) => {
                  // setTodos([
                  //   // immutable update
                  //   ...todos.slice(0, index),
                  //   event.target.value,
                  //   ...todos.slice(index + 1),
                  // ])
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  // setTodos([
                  //   // immutable delete
                  //   ...todos.slice(0, index),
                  //   ...todos.slice(index + 1),
                  // ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                // setTodos([...todos, ''])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
