import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react'

const Context = createContext({});

const HOST = 'http://localhost:3001';

export const DataContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState(null)

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true)
      const response = await fetch(`${HOST}/list`)
      const data = await response.json()
      setLists(data)
      setIsLoading(false)
    };
    fetchLists()
  }, [])

  useEffect(() => {
    const fetchTodos = async () => {
      if (!activeList) return
      setIsLoading(true)
      const response = await fetch(`${HOST}/list/${activeList.id}/todo`)
      const data = await response.json()
      setTodos(data)
      setIsLoading(false)
    };
    fetchTodos()
  }, [activeList, setTodos])

  const addTodo = useCallback((todo) => {
    const addTodoRequest = async () => {
      if (!activeList) return
      const response = await fetch(`${HOST}/list/${activeList.id}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      const data = await response.json()
      setTodos(data)
    }
    addTodoRequest()
  }, [activeList])

  const deleteTodo = useCallback((todo) => {
    const deleteTodoRequest = async () => {
      if (!activeList) return
      const response = await fetch(`${HOST}/list/${activeList.id}/todo/${todo.id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      setTodos(data)
    }
    deleteTodoRequest()
  }, [activeList]);

  const updateTodo = useCallback((todo) => {
    const updateTodoRequest = async () => {
      if (!activeList) return
      const response = await fetch(`${HOST}/list/${activeList.id}/todo/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      const data = await response.json()
      setTodos(data)
    }
    updateTodoRequest()
  }, [activeList])

  const context = {
    isLoading,
    lists,
    activeList,
    setActiveList,
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(Context)
  return context
};

export default Context
