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
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {lists.map((list) => (
              <ListItemButton key={list.id} onClick={() => setActiveList(list)}>
                <ListItemIcon>
                  <ReceiptIcon />
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
