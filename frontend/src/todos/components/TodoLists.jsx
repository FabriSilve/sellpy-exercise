import React, { Fragment } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { TodoListForm } from './TodoListForm'
import { useDataContext } from '../../DataContext'

export const TodoLists = ({ style }) => {
  const {
    isLoading,
    lists,
    setActiveList,
    activeList,
  } = useDataContext();

  if (isLoading || !lists.length) return null
  return (
    <Fragment>
      <Card style={{ margin: '1rem' }}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {lists.map((list) => (
              <ListItemButton key={list.id} onClick={() => setActiveList(list)}>
                <ListItemIcon>
                  {list.done ? <CheckCircleIcon color="success" /> : <ReceiptIcon />}
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      <TodoListForm key={activeList} />
    </Fragment>
  )
}
