import { FC, lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { BillingWrapper } from '../pages/Billing/BillingWrapper'
import { ManageMoviesWrapper } from '../pages/manageMovies/ManageMovies'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { ManageTheaterWrapper } from '../pages/manageTheater/ManageTheaterWrapper'
import { useNavigate } from 'react-router-dom';
import { AddMoviesWrapper } from '../pages/addMovies/AddMovies'
import { CurrentMoviesWrapper } from '../pages/addMovies/CurrentMovies'
import { CurrentTheatersWrapper } from '../pages/currentTheaters/CurrentTheatersWrapper'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  const navigate = useNavigate();
  const auth = localStorage.getItem('auth')
  const { role } = auth ? (JSON.parse(auth)) : { role: null }
  useEffect(() => {
    if (role != "admin" && role != "theaterAdm") {
      navigate('auth/login');
    }
  }, [role]);

  return (

    <Routes>
      <Route element={<MasterLayout />}>
        {role == "theaterAdm" ?
          <>
            <Route path='dashboard' element={<DashboardWrapper />} />
            <Route path='movies/*' element={<ManageMoviesWrapper />} />
            <Route path='theater/*' element={<ManageTheaterWrapper />} />
            <Route path='billing/*' element={<BillingWrapper />} />
            <Route path='analytics' element={<DashboardWrapper />} />


            <Route
              path='crafted/account/*'
              element={
                <SuspensedView>
                  <AccountPage />
                </SuspensedView>
              }
            />
            <Route
              path='apps/chat/*'
              element={
                <SuspensedView>
                  <ChatPage />
                </SuspensedView>
              }
            />
          </> :
          <>
          <Route path='dashboard' element={<CurrentMoviesWrapper />} />
          <Route path='movies' element={<CurrentMoviesWrapper />} />
          <Route path='add-movie' element={<AddMoviesWrapper />} />
          <Route path='verify-theater' element={<CurrentTheatersWrapper />} />
          <Route
              path='crafted/account/*'
              element={
                <SuspensedView>
                  <AccountPage />
                </SuspensedView>
              }
            />
            <Route
              path='apps/chat/*'
              element={
                <SuspensedView>
                  <ChatPage />
                </SuspensedView>
              }
            />
          </>
        }





        <Route
          path='builder'
          element={
            <SuspensedView>
              <BuilderPageWrapper />
            </SuspensedView>
          }
        />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />

        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
