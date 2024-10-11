/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { defaultReqPost } from '../../../request/main'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';



const loginSchema = Yup.object().shape({

  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'admin@demo.com',
  password: 'demo',
}


export function Login() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);



  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setError(null)
      try {
        const response = await defaultReqPost({ email: values.email, password: values.password }, 'user/theater-admin-login');
        const { token, role, theater } = response.data;
        localStorage.setItem('auth', JSON.stringify({ token, role, theater }));
        navigate('/dashboard');

      } catch (error: any) {
        setError(error.response.data.error)
        setLoading(false)
      }
    },
  })



  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential); 
      try {
        const response = await defaultReqPost({ email: decoded.email, password: "used_google_login" }, 'user/theater-admin-login');
        const { token, role, theater } = response.data;
        localStorage.setItem('auth', JSON.stringify({ token, role, theater }));
        navigate('/dashboard');

      } catch (error: any) {
        setError(error.response.data.error)
        setLoading(false)
      } 
    }
  }

  // Google Login Error handler
  const handleGoogleError = () => {
    setError('Google Login Failed')
   
  }



  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>

      </div>





      <div className='my-0 bg-light-info px-8  py-0 rounded' style={{ visibility: 'hidden' }}>
        <div className='text-info'>
          Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
          continue.
        </div>
      </div>
      {error ?
        <div className='mb-5 bg-light-info px-8  py-2 rounded'>
          <div className='text-danger'>
            <strong>Error : </strong>{error}
          </div>
        </div> : null}




      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input

          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Separator */}
      <div className='separator separator-content my-14'>
        <span className='w-200px text-gray-500 fw-semibold fs-7'>Or with Google</span>
      </div>
      {/* end::Separator */}


      <div className="row g-3 mb-9">
        <div className="col-12">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}  
            onError={handleGoogleError}      
          />
        </div>
      </div>


      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}
