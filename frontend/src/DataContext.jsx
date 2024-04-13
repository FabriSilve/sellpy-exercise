import {
  createContext,
  useState,
  useContext,

} from 'react'

const Context = createContext({});

export const DataContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [lists, setLists] = useState([])
  const [activeList, setActiveList] = useState(null)

  const [todos, setTodos] = useState([])



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
