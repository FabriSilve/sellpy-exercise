import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react'

import {
  fetchListsApi,
  fetchTodosApi,
  createTodoApi,
  deleteTodoApi,
  updateTodoApi,
} from './requests'

const Context = createContext({});

export const DataContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState(null)

  const [todos, setTodos] = useState([])
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true)
      const data = await fetchListsApi()
      setLists(data)
      setIsLoading(false)
    };
    fetchLists()
  }, [])

  useEffect(() => {
    const fetchTodos = async () => {
      if (!activeList) return
      const data = await fetchTodosApi(activeList.id)
      setTodos(data)
    };
    fetchTodos()
  }, [activeList, setTodos])

  const addTodo = useCallback((todo) => {
    const addTodoRequest = async () => {
      if (!activeList) return
      const todos = await createTodoApi(activeList.id, todo)
      const lists = await fetchListsApi()
      setTodos(todos)
      setLists(lists)
    }
    addTodoRequest()
  }, [activeList])

  const deleteTodo = useCallback((todo) => {
    const deleteTodoRequest = async () => {
      if (!activeList) return
      const todos = await deleteTodoApi(activeList.id, todo.id)
      const lists = await fetchListsApi()
      setTodos(todos)
      setLists(lists)
    }
    deleteTodoRequest()
  }, [activeList]);

  const updateTodoDelayed = useCallback((todo) => {
    if (!activeList) return
    if (timeoutId) clearTimeout(timeoutId)
    setTodos(todos.map((t) => t.id === todo.id ? todo : t))
    const newTimeoutId = setTimeout(async () => {
      await updateTodoApi(activeList.id, todo)
    }, 500);
    setTimeoutId(newTimeoutId)
  }, [activeList, todos, timeoutId, setTimeoutId])

  const updateTodo = useCallback((todo) => {
    const updateTodoRequest = async () => {
      if (!activeList) return
      const todos = await updateTodoApi(activeList.id, todo)
      const lists = await fetchListsApi()
      setTodos(todos)
      setLists(lists)
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
    updateTodoDelayed,
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
