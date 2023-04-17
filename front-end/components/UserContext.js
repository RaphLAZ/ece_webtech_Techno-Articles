import {createContext, useState} from 'react'

const UserContext = createContext()

export default UserContext

export const UserContextProvider = ({
<<<<<<< HEAD
  children
}) => {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider
      value={{
        user: user,
        login: (user) => {
          setUser(user)
        },
        logout: () => {
          setUser(null)
        }
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
=======
children
}) => {
    const [user, setUser] = useState(null)
    return (
        <UserContext.Provider
            value={{
                user: user,
                login: (user) => {
                    setUser(user)
                },
                logout: () => {
                    setUser(null)
                }
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
>>>>>>> d391d90e3ff32a2f3db7b5fe9b94646b9b8eace5
