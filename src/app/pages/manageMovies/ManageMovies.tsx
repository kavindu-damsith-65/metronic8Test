import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Card6 } from '../../../_metronic/partials/content/cards/Card6'
import { Card4 } from '../../../_metronic/partials/content/cards/Card4'
import { Search } from '../../../_metronic/partials'
import { Navigate, Outlet, Route, Routes,useNavigate } from 'react-router-dom'
import ScheduleMovie from './ScheduleMovie'

const ManageMovies = () => {
    
    return(
        <>

        <>
            <div className='d-flex flex-wrap flex-stack mb-6'>
                <h3 className='fw-bolder my-2'>
                    Currently Scheduled Movies
                    <span className='fs-6 text-gray-400 fw-bold ms-1'>(59)</span>
                </h3>

                <div className='d-flex my-2'>
                    <Search />
                </div>
            </div>

            <div className='row g-6 g-xl-9'>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
                <div className='col-md-6 col-xxl-4'>
                    <Card6
                        avatar='/media/avatars/300-6.jpg'
                        name='Black Widow'
                        type='Action/Thriller'
                        rating='4.6/10'
                        totalEarnings='10'
                        online={true}
                    />
                </div>
            </div>

            <div className='d-flex flex-stack flex-wrap pt-10'>
                <div className='fs-6 fw-bold text-gray-700'>Showing 1 to 10 of 50 entries</div>

                <ul className='pagination'>
                    <li className='page-item previous'>
                        <a href='#' className='page-link'>
                            <i className='previous'></i>
                        </a>
                    </li>

                    <li className='page-item active'>
                        <a href='#' className='page-link'>
                            1
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            2
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            3
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            4
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            5
                        </a>
                    </li>

                    <li className='page-item'>
                        <a href='#' className='page-link'>
                            6
                        </a>
                    </li>

                    <li className='page-item next'>
                        <a href='#' className='page-link'>
                            <i className='next'></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>



    </>
    )
}

const ManageMoviesWrapper = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.MANAGEMOVIES' })}</PageTitle>
            <Routes>
                <Route
                    path=''
                    element={
                        <>
                            <ManageMovies />
                        </>
                    }
                />
                <Route
                    path='schedule-movie'
                    element={
                        <>
                            <ScheduleMovie />
                        </>
                    }
                />
            </Routes>



        </>
    )
}

export { ManageMoviesWrapper }
