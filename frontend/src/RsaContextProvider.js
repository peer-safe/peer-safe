import React, { useState } from 'react'

export const RsaContext = React.createContext({
  rsaKey: "",
  setRsaKey: () => {}
})

export const RsaContextProvider = ({ children }) => {

  const setRsaKey = (rsaKey) => {
    setState({...state, rsaKey: rsaKey})
  }

  const initState = {
    rsaKey: "",
    setRsaKey: setRsaKey
  } 

  const [state, setState] = useState(initState)

  return (
    <RsaContext.Provider value={state}>
      {children}
    </RsaContext.Provider>
  )
}