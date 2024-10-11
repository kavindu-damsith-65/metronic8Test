import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { defaultReqPost } from '../../../request/main'
import { TrigToast } from '../../../request/Toast'

// Initial form values for new password and confirm password
const initialValues = {
  newPassword: '',
  confirmPassword: '',
}

// Schema for password validation
const passwordResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(3, 'Password must be at least 8 characters')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/\d/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
})

export function PasswordReset() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { email: string, role: string }
  const email = state.email
  const role = state.role
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)

  const formik = useFormik({
    initialValues,
    validationSchema: passwordResetSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setHasErrors(undefined)
      setError("")
      try {
       
        await defaultReqPost({ 
          email, 
          role,
          newPassword: values.newPassword 
        }, 'user/password-reset')

        setHasErrors(false)
        TrigToast("Password reset successfully", "success")
        navigate('/auth/login')
      } catch (error: any) {
        setSubmitting(false)
        setError(error.response?.data?.message || 'An error occurred')
        setHasErrors(true)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark fw-bolder mb-3'>Reset Password</h1>
        <div className='text-gray-500 fw-semibold fs-6'>
          Enter a new password for your account.
        </div>
      </div>

      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            {error}
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>Password reset successfully. Redirecting...</div>
        </div>
      )}

      {/* New Password Field */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>New Password</label>
        <input
          type='password'
          placeholder='Enter new password'
          autoComplete='off'
          {...formik.getFieldProps('newPassword')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.newPassword && formik.errors.newPassword },
            { 'is-valid': formik.touched.newPassword && !formik.errors.newPassword }
          )}
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.newPassword}</span>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Confirm new password'
          autoComplete='off'
          {...formik.getFieldProps('confirmPassword')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword },
            { 'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword }
          )}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confirmPassword}</span>
            </div>
          </div>
        )}
      </div>

      <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
        <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
          <span className='indicator-label'>Submit</span>
          {loading && (
            <span className='indicator-progress'>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_password_reset_form_cancel_button'
            className='btn btn-light'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  )
}
