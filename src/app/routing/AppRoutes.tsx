

import { FC } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage } from '../modules/auth'
import { App } from '../App'
import { UserRoutes } from './UserRoutes'
import { default as UserApp } from '../user/App';

const AppRoutes: FC = () => {
  // const {currentUser} = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='auth/*' element={<AuthPage />} />
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {/* <Route path='/user/*' element={<UserApp />}/> */}
          {/* {currentUser ? ( */}
          <>

            <Route path='/*' element={<PrivateRoutes/>} />
            <Route index element={<Navigate to='/dashboard' />} />
          </>
          {/* // ) : (
          //   <>
          //     <Route path='auth/*' element={<AuthPage />} />
          //     <Route path='*' element={<Navigate to='/auth' />} />
          //   </>
          // )} */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
