import {
  createContext,
  useState,
  useContext,
  useEffect,
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
  }, []);

  const context = {
    isLoading,
    lists,
    activeList,
    setActiveList,
    todos,
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
