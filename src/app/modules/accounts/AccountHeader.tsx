/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { Dropdown1 } from '../../../_metronic/partials'
import { useLocation } from 'react-router'
import { defaultReqPost } from '../../request/main'
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const AccountHeader: React.FC = () => {
  const localDate = moment();
  const utcDate = localDate.clone().utc();
  const auth = localStorage.getItem('auth')
  const { theater } = auth ? (JSON.parse(auth)) : { theater: "" }

  const [theaterData, setTheaterData] = useState<any | null>(null)

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {


    try {
      const response = await defaultReqPost({
        today: localDate.format('YYYY-MM-DD'),
        theaterId: theater
      }, 'analysis/theater-header');
      setTheaterData(response.data)
    } catch (error) {
      console.error('Error', error);
    }
  }

  return (
    theaterData ?
      <div className='card mb-5 mb-xl-10 shadow'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={"https://ca-times.brightspotcdn.com/dims4/default/27db8b4/2147483647/strip/true/crop/1170x780+0+48/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F06%2F84%2F88495353418284e1e9ded141b26b%2Fet-27-best-movie-theaters-starlight-cinemas-071.jpg"} alt='Metronic' />
                <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <a className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {theaterData.theaterDetails.name.toUpperCase()}
                    </a>
                    <a >
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

                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                      Theater Admin
                    </a>
                    <a

                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='geolocation' className='fs-4 me-1' />
                      {theaterData.theaterDetails.location}
                    </a>
                    <a

                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTIcon iconName='sms' className='fs-4 me-1' />
                      {theaterData.theaterDetails.business_email}
                    </a>
                  </div>
                </div>

                <div className='d-flex my-4'>

                  <Link className='btn btn-sm btn-light me-2' to={'/theater'}>
                    Manage Theater
                  </Link>

                  <Link className='btn btn-sm btn-primary me-3' to={'/movies'}>
                    Manage Movies
                  </Link>



                </div>
              </div>

              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>

                        <div className='fs-2 fw-bolder'>Rs.{parseFloat(theaterData.dailyEarninigsData.today.total_price)}</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>Today</div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>

                        <div className='fs-2 fw-bolder'>Rs.{parseFloat(theaterData.monthlyEarninigsData.thisMonth.total_price)}</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>This Month</div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>

                        <div className='fs-2 fw-bolder'>Rs.{parseFloat(theaterData.yearlyEarninigsData.thisYear.total_price)}</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>This Year</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


        </div>
      </div>
      : null

  )
}

export { AccountHeader }
