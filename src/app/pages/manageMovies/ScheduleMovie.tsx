import { useNavigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { KTIcon } from '../../../_metronic/helpers'
import { Dropdown1 } from '../../../_metronic/partials'
import { TablesWidget14 } from '../../../_metronic/partials/widgets'
import React from 'react'
import { defaultReqPost, defaultReqDelete } from '../../request/main'
import { useEffect, useState } from 'react'
import { ModelRecurrent, ModelOnetime } from './PopModels'
import { TrigToast } from '../../request/Toast'
import { Movie } from './ManageMovies'
import { range } from '../../request/Toast'
import { statics } from '../../request/main'



const DataRecurrent = (recurrentFilmsData: any, setRecurrentData: any, setRefresh: any, refresh: any) => {

  const recurrentTableData = recurrentFilmsData.map((film: any) => ({
    day: (
      <span className='text-dark fw-semibold text-dark d-block fs-7'>
        {film.day.split(',').map((day: string, index: number, arr: string[]) => (
          <React.Fragment key={index}>
            {day}
            {((index + 1) % 2 === 0 && index < arr.length - 1) && <br />}
            {index < arr.length - 1 && (index + 1) % 2 !== 0 && ', '}
          </React.Fragment>
        ))}
      </span>

    ),
    time: (
      <span className='text-dark fw-semibold text-dark d-block fs-7'>
        {new Date(`1970-01-01T${film.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </span>
    ),
    from: (
      <span className='text-dark fw-semibold text-dark d-block fs-7'>
        {new Date(film.from).toLocaleDateString()}
      </span>
    ),
    till: (
      <span className='text-dark fw-semibold text-dark d-block fs-7'>
        {new Date(film.till).toLocaleDateString()}
      </span>
    ),
    actions: (
      <div className='d-flex justify-content-start flex-shrink-0'>
        <a
          data-bs-toggle="modal"
          data-bs-target={'#RecurrentModel'}

          onClick={() => { setRecurrentData({ ...film, title: "Edit Schedule" }) }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        >
          <KTIcon iconName='pencil' className='fs-3' />
        </a>
        <a
          onClick={async () => {

            try {
              const response = await defaultReqDelete('films/delete-schedule-film/' + film.show_times_id);

              TrigToast("successfully Deleted", "success")
            } catch (error: any) {
              TrigToast("Error! " + error.response.data.error, "error")
            }
            setRefresh(!refresh)
          }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        >
          <KTIcon iconName='trash' className='fs-3' />
        </a>
      </div>
    ),
  }));

  return {
    title: "Recurrent Schedulings",
    subTitle: `Total ${recurrentFilmsData.length} Schedulings`,
    buttonTitle: "Add New",
    target: "RecurrentModel",
    table: {
      keys: ["day", "time", "from", "till", "actions"],
      headings: ["Day", "Time", "From", "Till", "Actions"],
      data: recurrentTableData,
    },
  };
};


const DataSingle = (oneTimeFilmsData: any, setOneTimeData: any, setRefresh: any, refresh: any) => {


  const oneTimeDataTable = oneTimeFilmsData.map((film: any) => ({
    type: (
      <span className='text-dark fw-semibold text-dark d-block fs-7'>
        Single
      </span>
    ),
    date: (
      <span className='text-dark fw-semibold text-dark d-block fs-7'>
        {film.date}
      </span>
    ),
    time: (
      <span className='text-dark fw-semibold text-dark d-block fs-7'>
        {new Date(`1970-01-01T${film.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </span>
    ),
    actions: (
      <div className='d-flex justify-content-start flex-shrink-0'>
        <a
          data-bs-toggle="modal"
          data-bs-target={'#SingleModel'}
          onClick={() => { setOneTimeData({ ...film, title: "Edit Schedule" }) }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        >
          <KTIcon iconName='pencil' className='fs-3' />
        </a>
        <a
          onClick={async () => {
            try {
              const response = await defaultReqDelete('films/delete-schedule-film/' + film.show_times_id);

              TrigToast("successfully Deleted", "success")
            } catch (error: any) {
              TrigToast("Error! " + error.response.data.error, "error")
            }

            setRefresh(!refresh)

          }}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        >
          <KTIcon iconName='trash' className='fs-3' />
        </a>
      </div>
    ),

  }));

  return (
    {
      title: "One Time Schedulings",
      subTitle: `Total ${oneTimeFilmsData.length} Schedulings`,
      buttonTitle: "Add New",
      target: "SingleModel",
      table: {
        keys: ["type", "date", "time", "actions"],
        headings: ["Type", "Date", "Time", "Actions"],
        data: oneTimeDataTable
      },



    }
  )
}


const ScheduleMovie = () => {
  const location = useLocation();
  const movieSchedule = location.state as { id: string }


  const [refresh, setRefresh] = useState(false);
  const [recurrentFilms, setRecurrentFilms] = useState<any[]>([]);
  const [oneTimeFilms, setOneTimeFilms] = useState<any[]>([]);
  const [recurrentData, setRecurrentData] = useState<any | null>();
  const [oneTimeData, setOneTimeData] = useState<any | null>();

  const auth = localStorage.getItem('auth')
  const { theater } = auth ? (JSON.parse(auth)) : { theater: "" }



  const filmDetailsId = movieSchedule.id;
  const theaterId = theater;


  const fetchData = async () => {
    try {

      const response = await defaultReqPost(
        {
          theaterId: theaterId,
          filmDetailsId: filmDetailsId,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        , 'films/get-schedule-film');



      setRecurrentFilms(response.data && response.data.recurrent ? response.data.recurrent : "");
      setOneTimeFilms(response.data && response.data.onetime ? response.data.onetime : "");


    } catch (error: any) {
      console.log(error.response.data.error)
    }
  }


  useEffect(() => {
    fetchData()
  }, [refresh]);


  return (
    <>
      <ModelRecurrent setRefresh={setRefresh} refresh={refresh} theatreId={theaterId} filmDetailsId={filmDetailsId} dataImport={recurrentData} />
      <ModelOnetime setRefresh={setRefresh} refresh={refresh} theatreId={theaterId} filmDetailsId={filmDetailsId} dataImport={oneTimeData} />

      <MovieHeader id={filmDetailsId} />

      <div className='row g-2 g-xl-8'>
        <div className='col-xl-6'>
          <TablesWidget14 data={{ ...DataRecurrent(recurrentFilms ? recurrentFilms : [], setRecurrentData, setRefresh, refresh), dataReset: setRecurrentData }} className='mb-5 mb-xl-8 card-xl-stretch' />

        </div>

        <div className='col-xl-6'>
          <TablesWidget14 data={{ ...DataSingle(oneTimeFilms ? oneTimeFilms : [], setOneTimeData, setRefresh, refresh), dataReset: setOneTimeData }} className='mb-5 mb-xl-8 card-xl-stretch' />
        </div>

      </div>

    </>
  )
}







const MovieHeader = ({ id }: { id: string }) => {
  const [data, setData] = useState<Movie | null>(null);

  const getData = async () => {
    try {
      const response = await defaultReqPost({ id: id }, 'films/get-film-details-all');
      setData(response.data[0]);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };


  useEffect(() => {
    getData();
  }, []);


  return (
    data ?
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img style={{ objectFit: 'contain' }} src={statics + data.image} alt='Metronic' />
                <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {data.name}
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
                      {range(
                        0,
                        Math.ceil((Number(data.rating) / 10) * 5)
                      ).map((i) => {
                        return (
                          <div className='rating-label me-2 checked'>
                            <i className='bi bi-star-fill fs-5'></i>
                          </div>
                        );
                      })}

                    </div>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <a
                     
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                      {data.category}
                    </a>

                    <a
                     
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
                        <div className='fs-2 fw-bolder'>{data.duration}</div>
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
      : null
  )
}



export default ScheduleMovie




