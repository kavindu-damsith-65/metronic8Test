// import {useAuth} from '../../../../app/modules/auth'
import { useEffect, useState } from 'react'
import { defaultReqGet } from '../../../../app/request/main'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { HeaderUserMenu, Search } from '../../../partials'
import { TrigToast } from '../../../../app/request/Toast'
import { statics } from '../../../../app/request/main'

/* eslint-disable jsx-a11y/anchor-is-valid */
const AsideToolbar = () => {
  const [data, setData] = useState<any | null>(null)
  const auth = localStorage.getItem('auth')
  const { theater } = auth ? (JSON.parse(auth)) : { theater: "" }
  const getDataTheaterAdmin = async () => {
    try {
      let response;
      if (theater) {
        response = await defaultReqGet('profile/details/' + theater);
      } else {
        response = await defaultReqGet('profile/details-admin');
      }

      setData(response.data.data)
    } catch (error: any) {
      TrigToast("Something Went Wrong", "error")
    }
  }
  useEffect(() => {
    getDataTheaterAdmin()
  }, [])




  return (
    <>

      {data ?

        <>
          <div className='aside-user d-flex align-items-sm-center justify-content-center py-5'>
            {/*begin::Symbol*/}
            <div className='symbol symbol-50px'>
              <img src={theater ? statics + data.adminData.image : "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"} alt='' />
            </div>
            {/*end::Symbol*/}

            {/*begin::Wrapper*/}
            <div className='aside-user-info flex-row-fluid flex-wrap ms-5'>
              {/*begin::Section*/}
              <div className='d-flex'>
                {/*begin::Info*/}
                <div className='flex-grow-1 me-2'>
                  {/*begin::Username*/}
                  <a href='#' className='text-white text-hover-primary fs-6 fw-bold'>
                    {data.adminData.first_name} {data.adminData.last_name}
                  </a>
                  {/*end::Username*/}

                  {/*begin::Description*/}
                  <span className='text-gray-600 fw-bold d-block fs-8 mb-1'>{theater ? "Theater Admin" : "System Admin"}</span>
                  {/*end::Description*/}

                  {/*begin::Label*/}
                  <div className='d-flex align-items-center text-success fs-9'>
                    <span className='bullet bullet-dot bg-success me-1'></span>online
                  </div>
                  {/*end::Label*/}
                </div>
                {/*end::Info*/}

               
                {theater ?
                  <div className='me-n2'>
                   
                    <a
                      href='#'
                      className='btn btn-icon btn-sm btn-active-color-primary mt-n2'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-start'
                      data-kt-menu-overflow='false'
                    >
                      <KTIcon iconName='setting-2' className='text-muted fs-1' />
                    </a>

                    <HeaderUserMenu />

                  
                  </div>


                  : null}


                {/*end::User menu*/}
              </div>
              {/*end::Section*/}
            </div>
            {/*end::Wrapper*/}
          </div>



          <div className='py-5'>
          </div>
        </>
        : null}

    </>
  )
}

export { AsideToolbar }
