const HOST = 'http://localhost:3001';

export const fetchListsApi = async () => {
  const response = await fetch(`${HOST}/list`)
  const data = await response.json()
  return data
}

export const fetchTodosApi = async (listId) => {
  const response = await fetch(`${HOST}/list/${listId}/todo`)
  const data = await response.json()
  return data
}

export const createTodoApi = async (listId, todo) => {
  const response = await fetch(`${HOST}/list/${listId}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const data = await response.json()
  return data
}

export const deleteTodoApi = async (listId, todoId) => {
  const response = await fetch(`${HOST}/list/${listId}/todo/${todoId}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}

export const updateTodoApi = async (listId, todo) => {
  const response = await fetch(`${HOST}/list/${listId}/todo/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const data = await response.json()
  return data
}
