import { useNavigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { KTIcon } from '../../../_metronic/helpers'
import { Dropdown1 } from '../../../_metronic/partials'
import { TablesWidget14 } from '../../../_metronic/partials/widgets'
import React from 'react'
import { defaultReqPost } from '../../request/main'
import { useEffect, useState } from 'react'



const DataRecurrent = (recurrentFilmsData: any) => {

  const recurrentTableData = recurrentFilmsData.map((film: any) => ({
    day: (
      <span className='text-dark fw-semibold text-dark d-block fs-7'>
        {film.day}
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
    ),
  }));

  return {
    title: "Recurrent Schedulings",
    subTitle: `Total ${recurrentFilmsData.length} Schedulings`,
    buttonTitle: "Add New",
    table: {
      keys: ["day", "time", "from", "till", "actions"],
      headings: ["Day", "Time", "From", "Till", "Actions"],
      data: recurrentTableData,
    },
  };
};


const DataSingle = (oneTimeFilmsData: any) => {
  // text-muted

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
    ),

  }));

  return (
    {
      title: "One Time Schedulings",
      subTitle: "Total 20 Schedulings",
      buttonTitle: "Add New",
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
  const movieSchedule = location.state as {id :string}



  const [recurrentFilms, setRecurrentFilms] = useState<any[]>([]);
  const [oneTimeFilms, setOneTimeFilms] = useState<any[]>([]);

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
  }, []);


  return (
    <>
      <Model theatreId={theaterId} filmDetailsId={filmDetailsId} />
      <MovieHeader />

      <div className='row g-2 g-xl-8'>
        <div className='col-xl-6'>
          <TablesWidget14 data={DataRecurrent(recurrentFilms ? recurrentFilms : [])} className='mb-5 mb-xl-8 card-xl-stretch' />

        </div>

        <div className='col-xl-6'>
          <TablesWidget14 data={DataSingle(oneTimeFilms ? oneTimeFilms : [])} className='mb-5 mb-xl-8 card-xl-stretch' />
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
  data?: { title: string };
  filmDetailsId: string;
  theatreId: string;
};

const Model: React.FC<Props> = ({ data = { title: "Schedule Movie" }, filmDetailsId, theatreId }) => {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [tillDate, setTillDate] = useState<string>('');

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  const handleSaveChanges = () => {
    const newRecurrentFilm = {
      filmDetailsId: filmDetailsId,
      theatreId: theatreId,
      type: "recurrent",
      day: selectedDay,
      time: selectedTime,
      from: fromDate,
      till: tillDate,
    };

    console.log('Saving new recurrent film:', newRecurrentFilm);
  };

  return (
    <div className="modal fade" id="exampleModalCenter" data-bs-backdrop="static" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{data.title}</h5>
          </div>

          <div className="modal-body">
            <div className="d-flex justify-content-around mb-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`btn btn-sm ${selectedDay === day ? 'btn-primary' : 'btn-light'} font-weight-bold`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="mb-3">
              <label htmlFor="timePicker" className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                id="timePicker"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fromDatePicker" className="form-label">From</label>
              <input
                type="date"
                className="form-control"
                id="fromDatePicker"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tillDatePicker" className="form-label">Till</label>
              <input
                type="date"
                className="form-control"
                id="tillDatePicker"
                value={tillDate}
                onChange={(e) => setTillDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-light-danger font-weight-bold" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-sm btn-primary font-weight-bold" onClick={handleSaveChanges}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};