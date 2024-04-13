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
  const [todoToUpdate, setTodoToUpdate] = useState(null)

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
      setIsLoading(true)
      const data = await fetchTodosApi(activeList.id)
      setTodos(data)
      setIsLoading(false)
    };
    fetchTodos()
  }, [activeList, setTodos])

  const addTodo = useCallback((todo) => {
    const addTodoRequest = async () => {
      if (!activeList) return
      const data = await createTodoApi(activeList.id, todo)
      setTodos(data)
    }
    addTodoRequest()
  }, [activeList])

  const deleteTodo = useCallback((todo) => {
    const deleteTodoRequest = async () => {
      if (!activeList) return
      const data = await deleteTodoApi(activeList.id, todo.id)
      setTodos(data)
    }
    deleteTodoRequest()
  }, [activeList]);

  const updateTodo = useCallback((todo) => {
    if (!activeList) return
    setTodoToUpdate(todo)
    setTodos(todos.map((t) => t.id === todo.id ? todo : t))
  }, [setTodoToUpdate, activeList, todos])

  useEffect(() => {
    const timeoutID = setTimeout(async () => {
      if (!activeList || !todoToUpdate) return
      const data = await updateTodoApi(activeList.id, todoToUpdate)
      setTodos(data)
    }, 500);
    return () => clearTimeout(timeoutID);
  }, [todoToUpdate, activeList]);

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
