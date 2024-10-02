import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { Card6 } from '../../../_metronic/partials/content/cards/Card6'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { defaultReqPost } from '../../request/main'
import { statics } from '../../request/main'
import { KTIcon } from '../../../_metronic/helpers'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { motion } from 'framer-motion'
import ImageUpload from '../../modules/widgets/components/ImageUpload'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { TrigToast } from '../../request/Toast'

const movieDetailsSchema = Yup.object().shape({
    name: Yup.string().required('Movie name is required'),
    rating: Yup.number()
        .required('Rating is required')
        .min(0, 'Rating must be at least 0')
        .max(10, 'Rating cannot exceed 10')
        .typeError('Rating must be a valid number'),
    description: Yup.string().required('Description is required'),
    optional_description: Yup.string(),
    duration: Yup.string().required('Duration is required'),
    year: Yup.number().required('Year is required').positive().integer(),
    added_date: Yup.string().required('Added date is required'),
    category: Yup.string()
        .required('Category is required')
        .test('is-not-empty', 'Select a category', function (value) {
            return value !== '';
        }),
    auther: Yup.string().required('Author name is required'),
});

const initialValues: Movie = {
    name: '',
    rating: '',
    description: '',
    optional_description: '',
    duration: '',
    year: 2024,
    added_date: '',
    category: '',
    auther: '',
};

export type Movie = {
    id?: string | null;
    name: string;
    rating: string;
    description: string;
    optional_description?: string;
    duration: string;
    year: number;
    added_date: string;
    category: string;
    auther: string;
};


interface LocationState {
    id: string | null;
}


const AddMovies = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const state = location.state as LocationState;
    const { id } = state || { id: null };

    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<string | null>(null);

    const getData = async () => {
        try {
            const response = await defaultReqPost({ id: id }, 'films/get-single-film-details');
            const d = response.data[0]
            setImage(d.image)
            formik.setValues({
                name: d.name,
                rating: d.rating,
                description: d.description,
                optional_description: d.optional_description,
                duration: d.duration,
                year: d.year,
                added_date: d.added_date,
                category: d.category,
                auther: d.auther,
            });

        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };
    useEffect(() => {
        if (id) {
            getData()
        }
    }, []);



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        api_key: '8296651dbb4f8e4c995dfce2deb783c3',
                        language: 'en-US',
                    },
                })
                setCategories(response.data.genres);
            } catch (error) {
                console.error('Error fetching movie categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const formik = useFormik<Movie>({
        initialValues,
        validationSchema: movieDetailsSchema,
        onSubmit: async (values) => {

            if (!image) {
                TrigToast("Please Upload An Image", "error")
                return
            }
            const finalData = { ...values, id, image }
            try {
                const response = await defaultReqPost(finalData, 'films/set-film-details');
                TrigToast("Chnages Applied", "success")
                setTimeout(() => {
                    navigate("/movies")
                }, 1000);


            } catch (error: any) {
                TrigToast(error.response.data.error, "error")
                console.error('Error fetching movie details:', error);
            }
        },
    })



    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return dateString.split('T')[0]; // Extracting YYYY-MM-DD
    };

    return (
        <>
            <div id='kt_account_profile_details' className='collapse show'>
                <form onSubmit={formik.handleSubmit} noValidate className='form'>
                    <div className='card-body border-top p-9'>
                        <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label fw-bold fs-6'>Movie Poster</label>
                            <div className='col-lg-8'>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className='image-input image-input-outline'
                                    data-kt-image-input='true'
                                    style={{ cursor: 'pointer', backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}
                                >

                                    <ImageUpload image={image} setImage={setImage} />
                                    {/* <div
                                        className='image-input-wrapper w-125px h-125px'
                                        style={{ backgroundImage: `url(${'https://cdn-icons-png.flaticon.com/512/2716/2716054.png'})` }}
                                    ></div> */}
                                </motion.div>
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Name</label>

                            <div className='col-lg-8'>
                                <div className='row'>
                                    <div className='col-lg-6 fv-row'>
                                        <input
                                            type='text'
                                            className='shadow-sm form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                            placeholder='Movie Name'
                                            {...formik.getFieldProps('name')}
                                        />
                                        {formik.touched.name && formik.errors.name && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>{formik.errors.name}</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className='col-lg-6 fv-row'>
                                        <input
                                            type='text'
                                            className='shadow-sm form-control form-control-lg form-control-solid'
                                            placeholder='Year'
                                            {...formik.getFieldProps('year')}
                                        />
                                        {formik.touched.year && formik.errors.year && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>{formik.errors.year}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Description</label>

                            <div className='col-lg-8 fv-row'>
                                <textarea
                                    className='shadow-sm form-control form-control-lg form-control-solid'
                                    placeholder='Description'
                                    {...formik.getFieldProps('description')}
                                    rows={3} // Set to 3 lines
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>{formik.errors.description}</div>
                                    </div>
                                )}
                            </div>
                        </div>




                        <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Addtional Data</label>

                            <div className='col-lg-8'>
                                <div className='row'>
                                    <div className='col-lg-6 fv-row'>
                                        <div className='col-lg-8 fv-row'>
                                            <select
                                                className='shadow-sm form-select form-select-solid form-select-lg fw-bold'
                                                {...formik.getFieldProps('category')}
                                            >
                                                <option value=''>Select a Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))}

                                            </select>
                                            {formik.touched.category && formik.errors.category && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>{formik.errors.category}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='col-lg-6 fv-row'>
                                        <input
                                            type='number'
                                            className='shadow-sm form-control form-control-lg form-control-solid'
                                            placeholder='Rating'
                                            min='0'
                                            max='10'
                                            step='0.1'
                                            {...formik.getFieldProps('rating')}
                                        />
                                        {formik.touched.rating && formik.errors.rating && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>{formik.errors.rating}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                <span className='required'>Duration</span>
                            </label>

                            <div className='col-lg-8 fv-row'>
                                <input
                                    type='tel'
                                    className='shadow-sm form-control form-control-lg form-control-solid'
                                    placeholder='hh mm'
                                    {...formik.getFieldProps('duration')}
                                />
                                {formik.touched.duration && formik.errors.duration && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>{formik.errors.duration}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                <span className='required'>Author</span>
                            </label>

                            <div className='col-lg-8 fv-row'>
                                <input
                                    type='tel'
                                    className='shadow-sm form-control form-control-lg form-control-solid'
                                    placeholder='Author'
                                    {...formik.getFieldProps('auther')}
                                />
                                {formik.touched.auther && formik.errors.auther && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>{formik.errors.auther}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                <span className='required'>Released date</span>
                            </label>

                            <div className='col-lg-8 fv-row'>
                                <input
                                    type='date'
                                    className='shadow-sm form-control form-control-lg form-control-solid'
                                    placeholder='Released date'
                                    {...formik.getFieldProps('added_date')}
                                    value={formatDate(formik.values.added_date)} // Format the date for display
                                />
                                {formik.touched.added_date && formik.errors.added_date && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>{formik.errors.added_date}</div>
                                    </div>
                                )}
                            </div>
                        </div>



                    </div>

                    <div className='card-footer d-flex justify-content-end py-6 px-9'>
                        <button type='submit' className='btn btn-primary' disabled={loading}>
                            {!loading && 'Save Changes'}
                            {loading && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    Please wait...{' '}
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};








const AddMoviesWrapper = () => {
    const intl = useIntl();
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.ADDMOVIE' })}</PageTitle>
            <AddMovies />
        </>
    );
};

export { AddMoviesWrapper };
