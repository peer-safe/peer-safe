import React, { useState } from 'react'

export const VaultContext = React.createContext({
  vaultAddy: "",
  setVaultAddy: () => {}
})

export const VaultContextProvider = ({ children }) => {

  const setVaultAddy = (vaultAddy) => {
    setState({...state, vaultAddy: vaultAddy})
  }

  const initState = {
    vaultAddy: "",
    setVaultAddy: setVaultAddy
  } 

  const [state, setState] = useState(initState)

  return (
    <VaultContext.Provider value={state}>
      {children}
    </VaultContext.Provider>
  )
}