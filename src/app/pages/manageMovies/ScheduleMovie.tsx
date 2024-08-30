import { useNavigate, Outlet, Route, Routes } from 'react-router-dom'
import { KTIcon } from '../../../_metronic/helpers'
import { Dropdown1 } from '../../../_metronic/partials'
import { TablesWidget14 } from '../../../_metronic/partials/widgets'
import React from 'react'
import { defaultReqPost } from '../../request/main'
import { useEffect,useState } from 'react'



const DataRecurrent = () => {
  // text-muted
  return (
    {
      title: "Recurrent Schedulings",
      subTitle: "Total 20 Schedulings",
      buttonTitle: "Add New",
      table: {
        keys: ["day", "time", "from", "till", "actions"],
        headings: ["Day", "Time", "From", "Till", "Actions"],
        data: [
          {
            day: <>
              <span className='text-dark fw-semibold text-dark d-block fs-7'>
                Sun,Mon<br />Tue,Wed<br />Thur,Fri
              </span>
            </>,
            time: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              12.30 PM
            </span>,
            from: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              2024.07.25
            </span>,
            till: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              2024.08.25
            </span>,
            actions: <>
              <div className='d-flex justify-content-start flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTIcon iconName='pencil' className='fs-3' />
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <KTIcon iconName='trash' className='fs-3' />
                </a>
              </div>
            </>
          },

          {
            day: <>
              <span className='text-dark fw-semibold text-dark d-block fs-7'>
                Sun,Fri
              </span>
            </>,
            time: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              12.30 PM
            </span>,
            from: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              2024.07.25
            </span>,
            till: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              2024.08.25
            </span>,
            actions: <>
              <div className='d-flex justify-content-start flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTIcon iconName='pencil' className='fs-3' />
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <KTIcon iconName='trash' className='fs-3' />
                </a>
              </div>
            </>
          }
        ]
      },



    }
  )
}


const DataSingle = () => {
  // text-muted
  return (
    {
      title: "One Time Schedulings",
      subTitle: "Total 20 Schedulings",
      buttonTitle: "Add New",
      table: {
        keys: ["type", "date", "time", "actions"],
        headings: ["Type", "Date", "Time", "Actions"],
        data: [
          {
            type: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              Single
            </span>,
            time: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              12.30 PM
            </span>,
            date: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              2024.07.25
            </span>,

            actions: <>
              <div className='d-flex justify-content-start flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTIcon iconName='pencil' className='fs-3' />
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <KTIcon iconName='trash' className='fs-3' />
                </a>
              </div>
            </>
          },
          {
            type: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              Single
            </span>,
            time: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              12.30 PM
            </span>,
            date: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              2024.07.25
            </span>,

            actions: <>
              <div className='d-flex justify-content-start flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTIcon iconName='pencil' className='fs-3' />
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <KTIcon iconName='trash' className='fs-3' />
                </a>
              </div>
            </>
          },
          {
            type: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              Single
            </span>,
            time: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              12.30 PM
            </span>,
            date: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              2024.07.25
            </span>,

            actions: <>
              <div className='d-flex justify-content-start flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTIcon iconName='pencil' className='fs-3' />
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <KTIcon iconName='trash' className='fs-3' />
                </a>
              </div>
            </>
          },
          {
            type: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              Single
            </span>,
            time: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              12.30 PM
            </span>,
            date: <span className='text-dark fw-semibold text-dark d-block fs-7'>
              2024.07.25
            </span>,

            actions: <>
              <div className='d-flex justify-content-start flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTIcon iconName='pencil' className='fs-3' />
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <KTIcon iconName='trash' className='fs-3' />
                </a>
              </div>
            </>
          },


        ]
      },



    }
  )
}


const ScheduleMovie = () => {

   const fetchData= async()=>{
    try {
      const response = await defaultReqPost( 
        {
          theaterId:"5c86b633-3db4-4c9a-bbeb-c1faec0f956f",
          filmDetailsId:"3abb4de3-0315-498d-b7f6-bbac2bd054a0",
          timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      , 'films/get-schedule-film');

       console.log(response.data)

    } catch (error: any) {
      console.log(error.response.data.error)
    }
   }


   useEffect(() => {
     fetchData()
  }, []);
  
  return (
    <>
      <Model/>
      <MovieHeader />

      <div className='row g-2 g-xl-8'>
        <div className='col-xl-6'>
          <TablesWidget14 data={DataRecurrent()} className='mb-5 mb-xl-8 card-xl-stretch' />

        </div>

        <div className='col-xl-6'>
          <TablesWidget14 data={DataSingle()} className='mb-5 mb-xl-8 card-xl-stretch' />
        </div>

      </div>

    </>
  )
}




export default ScheduleMovie







const MovieHeader = () => {
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img style={{ objectFit: 'contain' }} src={'https://creativereview.imgix.net/content/uploads/2023/12/Oppenheimer.jpg?auto=compress,format&q=60&w=1263&h=2000'} alt='Metronic' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    OPPENHEIMER
                  </a>
                  <a href='#'>
                    <KTIcon iconName='verify' className='fs-1 text-primary' />
                  </a>
                  <a
                    href='#'
                    className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_upgrade_plan'
                  >
                    Pro
                  </a>

                  <div className='rating mx-3'>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 checked'>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                    <div className='rating-label me-2 '>
                      <i className='bi bi-star-fill fs-5'></i>
                    </div>
                  </div>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                    Biographical thriller drama
                  </a>

                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTIcon iconName='sms' className='fs-4 me-1' />
                    By Christopher Nolan
                  </a>
                </div>
              </div>

              <div className='d-flex my-4'>

                <a
                  href='#'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  More Details
                </a>

              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                      <div className='fs-2 fw-bolder'>4500$</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Earnings</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                      <div className='fs-2 fw-bolder'>75</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Tickets</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                      <div className='fs-2 fw-bolder'>2h 34min</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Duration</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

type Props = {
 
  data?: any,
}

const Model:React.FC<Props> = ({data={title:"Schedule Movie"}}) => {
  return (
    <div className="modal fade" id="exampleModalCenter" data-bs-backdrop="static" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
          <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{data.title}</h5>
                {/* <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <i aria-hidden="true" className="ki ki-close"></i>
                </button> */}
            </div>
            <div className="modal-body">
                ...
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-sm btn-light-danger font-weight-bold" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-sm  btn-primary font-weight-bold">Save changes</button>
            </div>
          </div>
        </div>
      </div>
  )
}