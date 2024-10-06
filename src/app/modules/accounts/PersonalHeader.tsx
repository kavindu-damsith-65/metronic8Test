/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { Dropdown1 } from '../../../_metronic/partials'
import { useLocation } from 'react-router'
import { defaultReqGet } from '../../request/main'
import { TrigToast } from '../../request/Toast'
import { statics } from '../../request/main'
import { useNavigate } from 'react-router-dom'


const PersonalHeader: React.FC<{refresh?:any}> = ({refresh=false}) => {
  const [data, setData] = useState<any | null>(null)
  const auth = localStorage.getItem('auth')
  const { theater } = auth ? (JSON.parse(auth)) : { theater: "" }
  const getData = async () => {
    try {
      const response = await defaultReqGet('profile/details/' + theater);
      setData(response.data.data)
    } catch (error: any) {
      TrigToast("Something Went Wrong", "error")
    }
  }
  useEffect(() => {
    getData()
  }, [refresh])




  const location = useLocation()
  const navigate=useNavigate()

  return (
    data ?
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={statics + data.adminData.image} alt='Metronic' />
                <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <a  className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {data.adminData.first_name} {data.adminData.last_name}
                    </a>
                    <a href='#'>
                      <KTIcon iconName='verify' className='fs-1 text-primary' />
                    </a>
                    <a
                     
                      className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_upgrade_plan'
                    >
                      Pro
                    </a>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                      Theater Admin
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='geolocation' className='fs-4 me-1' />
                    {data.theaterData.location}
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTIcon iconName='sms' className='fs-4 me-1' />
                      {data.adminData.email}
                    </a>
                  </div>
                </div>

                <div className='d-flex my-4'>
                  <Link to="/movies"  className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                    <KTIcon iconName='check' className='fs-3 d-none' />

                    <span className='indicator-label'>Manage Movies</span>
                    <span className='indicator-progress'>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </Link>
                  <Link
                    to="/theater"
                    className='btn btn-sm btn-primary me-3'
                   
                  >
                    Manage Theater
                  </Link>
                  
                </div>
              </div>


            </div>
          </div>


        </div>
      </div>
      : null
  )
}

export { PersonalHeader }
