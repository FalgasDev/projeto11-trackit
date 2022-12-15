import React, { createContext, useState } from "react";

export const AuthContext = createContext()

function AuthProvider({children}) {
  const [image, setImage] = useState('')
  const [token, setToken] = useState('')

  return (
    <AuthContext.Provider value={{image, setImage, token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider