import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material'
import { TodoLists } from './todos/components/TodoLists'

const App = () => {
  return (
    <Box displa="flex" flexDirection="column" >
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            Things to do
          </Typography>
        </Toolbar>
      </AppBar>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          maxWidth="80rem"
          flexGrow={1}
        >
          <TodoLists />
        </Box>
      </Box>
    </Box>
  )
}

export default App
