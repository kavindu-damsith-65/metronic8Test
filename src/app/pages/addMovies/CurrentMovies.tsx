import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Card6 } from '../../../_metronic/partials/content/cards/Card6'
import { Routes, Route, useNavigate } from 'react-router-dom'
// import ScheduleMovie from './ScheduleMovie'
import { useEffect, useState } from 'react'
import { defaultReqPost,defaultReqDelete } from '../../request/main'
import { statics } from '../../request/main'
import { KTIcon } from '../../../_metronic/helpers'
import { Card7 } from '../../../_metronic/partials/content/cards/Card7'
import { AddMoviesWrapper } from './AddMovies'
import { TrigToast } from '../../request/Toast'

export type Movie = {
    id: string;
    name: string;
    rating: string;
    description: string;
    image: string;
    optional_description?: string;
    duration: string;
    year: number;
    added_date: string;
    added_time: string;
    category: string;
};

const CurrentMovies = () => {
    const navigate=useNavigate()

    const [data, setData] = useState<Movie[]>([]);
    const [searchVal, setSearchVal] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [refresh,setRefresh]=useState(false)
    const maxMoviesPerPage = 6; // Maximum movies per page

    const getData = async () => {
        try {
            const response = await defaultReqPost({}, 'films/get-current-films');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

   

    useEffect(() => {
        getData();

    }, [refresh]);

   
    const filteredMovies = data?.filter((movie) =>
        movie.name.toLowerCase().includes(searchVal.toLowerCase())
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredMovies.length / maxMoviesPerPage);

    // Get movies for the current page
    const paginatedMovies = filteredMovies.slice(
        (currentPage - 1) * maxMoviesPerPage,
        currentPage * maxMoviesPerPage
    );

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {data && data.length > 0 ? (
                <>
                    <div className='d-flex flex-wrap flex-stack mb-6'>
                        <h3 className='fw-bolder my-2'>
                            Currently Available Movies
                            <span className='fs-6 text-gray-400 fw-bold ms-1'>({filteredMovies.length})</span>
                        </h3>

                        <div className='d-flex my-2'>
                            <form data-kt-search-element='form' className='w-100 position-relative' autoComplete='off'>
                                <KTIcon
                                    iconName='magnifier'
                                    className='fs-2 search-icon position-absolute top-50 translate-middle-y ms-4'
                                />
                                <input
                                    type='text'
                                    className='search-input form-control ps-13 fs-7 h-40px'
                                    name='search'
                                    value={searchVal}
                                    onChange={(e) => setSearchVal(e.target.value)}
                                    placeholder='Quick Search'
                                    data-kt-search-element='input'
                                />
                            </form>
                        </div>
                    </div>

                    <div className='d-flex justify-content-end my-10'>
                    <button onClick={() => {
                        navigate('/add-movie', {
                            state: { id: null },
                        });
                    }} className='btn btn-md btn-success fw-bolder px-10' id='kt_drawer_chat_toggle'>
                       <i className="fa fa-plus" aria-hidden="true"></i> Add New Movie
                    </button>
                    </div>


                    <div className='row g-6 g-xl-9'>
                        {paginatedMovies.map((movie) => (
                            <div key={movie.id} className='col-md-6 col-xxl-4'>
                                <Card7
                                    setRefresh={setRefresh}
                                    refresh={refresh}
                                    avatar={statics + movie.image}
                                    name={movie.name}
                                    type={movie.category}
                                    rating={parseFloat(movie.rating) + '/10'}
                                    totalEarnings={movie.duration}
                                    online={true}
                                    id={movie.id}
                                />
                            </div>
                        ))}
                    </div>

                    <div className='d-flex flex-stack flex-wrap pt-10'>
                        <div className='fs-6 fw-bold text-gray-700'></div>

                        <ul className='pagination'>
                            <li className={`page-item previous ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className='page-link'
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <i className='previous'></i>
                                </button>
                            </li>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button
                                        className='page-link'
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item next ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className='page-link'
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <i className='next'></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            ) : null}
        </>
    );
};

const CurrentMoviesWrapper = () => {
    const intl = useIntl();
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.CURRENTMOVIES' })}</PageTitle>
            <Routes>
                <Route
                    path=''
                    element={<CurrentMovies />}
                />
            </Routes>
        </>
    );
};

export { CurrentMoviesWrapper };
