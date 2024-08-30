/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import {useAuth} from '../../../../app/modules/auth'
import { Languages } from './Languages'
import { toAbsoluteUrl } from '../../../helpers'

const HeaderUserMenu: FC = () => {
  // const {currentUser, logout} = useAuth()
  const navigate=useNavigate()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
      data-popper-placement='bottom-start'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              Kavindu Dasmith
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <a className='fw-bold text-muted text-hover-primary fs-7'>
              {/* {currentUser?.email} */}
              kavindudamsith9@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>



      <div className='menu-item px-5'>
        <Link to='/movies' className='menu-link px-5'>
          Manage Movies
        </Link>
       
      </div>

      <div className='menu-item px-5'>
        <Link to='/billing' className='menu-link px-5'>
          Billing
        </Link>
       
      </div>
      <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Account Settings
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a 
         onClick={() => {
          localStorage.removeItem('auth');
          navigate("/auth/login")

        }}
        className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
