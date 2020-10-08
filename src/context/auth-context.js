import React from 'react'
import { useAsync } from 'react-async'
import { bootstrapAppData } from '../utils/bootstrap'
import * as authClient from '../utils/auth-client'

const AuthContext = React.createContext()

function AuthProvider (props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false)
  const {
    data = { user: null },
    error,
    isRejected,
    isPending,
    isSettled,
    reload,
  } = useAsync({
    promiseFn: bootstrapAppData,
  })

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true)
    }
  }, [isSettled])

  if (!firstAttemptFinished) {
    if (isPending) {
      return (<div className="spinner-border avatar-lg text-primary m-2"
                  role="status"></div>)
    }

    if (isRejected) {
      return (
        <div className={'alert alert-danger'}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      )
    }
  }

  const login = (username,password) => authClient.login(username,password).then(reload)
  const logout = () => authClient.logout().then(window.location.reload())

  return (
    <AuthContext.Provider value={{ data, login, logout }} {...props} />
  )
}

function useAuth () {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
