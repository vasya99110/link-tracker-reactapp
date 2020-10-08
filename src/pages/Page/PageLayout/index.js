import React from 'react'
import { ProfileContextProvider } from '../../Profile/profile-context'
import userReducer from '../../../reducers/user'
import { useUser } from '../../../context/user-context'
import { Helmet } from 'react-helmet/es/Helmet'
import Wrapper from '../Wrapper'
import { useAppContextValue } from '../../../context/app-context'

export default function PageLayout ({ children, pageTittle }) {
  const [{ mode }] = useAppContextValue()
  const user = useUser()
  const mainReducer = ({ user, theme }, action) => ({
    user: userReducer(user, action),
  })

  React.useLayoutEffect(() => {
    document.body.classList.remove('loading')
    document.body.setAttribute('data-leftbar-theme', 'dark')
    document.getElementsByTagName('body')[0].classList.remove(
      'authentication-bg')

    const updateTheme = (mode) => {
      /*const mainStyleContainer = document.getElementById(
        'main-style-container'), assetPath = process.env.PUBLIC_URL

      if (mode === 'dark') {
        mainStyleContainer.setAttribute('href', `${assetPath}/assets/css/app-dark.min.css`)
      } else {
        mainStyleContainer.setAttribute('href', `${assetPath}/assets/css/app.min.css`)
      }*/

      document.body.setAttribute('data-theme', mode)
    }

    updateTheme(mode)
  }, [mode])

  return (
    <>
      <ProfileContextProvider initialState={{ user: { ...user } }}
                              reducer={mainReducer}>
        <Helmet>
          <title>{process.env.REACT_APP_NAME} {pageTittle
            ? `- ${pageTittle}`
            : ''}</title>
        </Helmet>

        <Wrapper>
          {children}
        </Wrapper>
      </ProfileContextProvider>
    </>
  )
}