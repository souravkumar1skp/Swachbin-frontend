import React, { createContext, useContext, useReducer } from 'react'
import reducer from "./reducer";

let initialState = {
  location: { lng: 0, lat: 0 },
  login: false,
}

const Context = createContext(initialState)

export const useValue = () => {
  return useContext(Context)
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default ContextProvider;