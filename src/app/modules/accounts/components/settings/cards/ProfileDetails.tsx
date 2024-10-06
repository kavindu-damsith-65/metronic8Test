import React, { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { defaultReqGet, defaultReqPost } from '../../../../../request/main';
import { useLocation, useNavigate } from 'react-router-dom';
import { TrigToast } from '../../../../../request/Toast';
import axios from 'axios';
import ImageUpload from '../../../../widgets/components/ImageUpload';

const profileDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().required('Name is required'),
  businessEmail: Yup.string().email('Invalid email').required('Business email is required'),
  description: Yup.string(),
  address: Yup.string().required('Address is required'),
  location: Yup.string().required('Location is required'),
  country: Yup.string().required('Country is required'),
});

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  businessEmail: string;
  description: string;
  address: string;
  location: string;
  country: string;
}

const initialValues: Profile = {
  firstName: '',
  lastName: '',
  email: '',
  name: '',
  businessEmail: '',
  description: '',
  address: '',
  location: '',
  country: '',
};



interface LocationState {
  id: string | null;
}

interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

const ProfileDetails: React.FC<{refresh?:boolean,setRefresh?:any}> = ({setRefresh,refresh}) => {
  const location = useLocation();
  const navigate = useNavigate()
  const auth = localStorage.getItem('auth')
  const { theater } = auth ? (JSON.parse(auth)) : { theater: "" }

  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);



  const getDataIni = async () => {
    try {
      const response = await defaultReqGet('profile/details/' + theater);
      const d = response.data.data
      formik.setValues({
        firstName: d.adminData.first_name,
        lastName: d.adminData.last_name,
        email: d.adminData.email,
        name: d.theaterData.name,
        businessEmail: d.theaterData.business_email,
        description: d.theaterData.description,
        address: d.theaterData.address,
        location: d.theaterData.location,
        country: d.theaterData.country,
      });
      setImage(d.adminData.image)
    } catch (error: any) {
      TrigToast("Something Went Wrong", "error")
    }
  }
  useEffect(() => {
    getDataIni()
  }, [])



  const formik = useFormik<Profile>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => {
     

      if (!image) {
        TrigToast("Please Upload An Image", "error")
        return
      }
      const finalData = { ...values, theater, image }
      try {
        const response = await defaultReqPost(finalData, 'profile/set');
        TrigToast("Chnages Applied", "success")
        setRefresh(!refresh)
        navigate('/crafted/account/overview')

      } catch (error: any) {
        TrigToast(error.response.data.error, "error")
        console.error('Error:', error);
      }
    },
  })


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Edit Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}
                >
                    <ImageUpload image={image} setImage={setImage} />
                 
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.firstName}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Last name'
                      {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.lastName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Contact Email</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Contact Email'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.email}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Theater Name</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Theater Name'
                  {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Business Email</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Business Email'
                  {...formik.getFieldProps('businessEmail')}
                />
                {formik.touched.businessEmail && formik.errors.businessEmail && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.businessEmail}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Theater Description</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Theater Description'
                  {...formik.getFieldProps('description')}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.description}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Theater Address</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Theater Address'
                  {...formik.getFieldProps('address')}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.address}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Theater Location</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='shadow-sm form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('location')}
                >
                  <option value=''>Select Theater Location</option>
                  <option value='Ampara'>Ampara</option>
                  <option value='Anuradhapura'>Anuradhapura</option>
                  <option value='Badulla'>Badulla</option>
                  <option value='Batticaloa'>Batticaloa</option>
                  <option value='Colombo'>Colombo</option>
                  <option value='Galle'>Galle</option>
                  <option value='Gampaha'>Gampaha</option>
                  <option value='Hambantota'>Hambantota</option>
                  <option value='Jaffna'>Jaffna</option>
                  <option value='Kalutara'>Kalutara</option>
                  <option value='Kandy'>Kandy</option>
                  <option value='Kegalle'>Kegalle</option>
                  <option value='Kilinochchi'>Kilinochchi</option>
                  <option value='Kurunegala'>Kurunegala</option>
                  <option value='Mannar'>Mannar</option>
                  <option value='Matale'>Matale</option>
                  <option value='Matara'>Matara</option>
                  <option value='Moneragala'>Moneragala</option>
                  <option value='Mullaitivu'>Mullaitivu</option>
                  <option value='Nuwara Eliya'>Nuwara Eliya</option>
                  <option value='Polonnaruwa'>Polonnaruwa</option>
                  <option value='Puttalam'>Puttalam</option>
                  <option value='Ratnapura'>Ratnapura</option>
                  <option value='Trincomalee'>Trincomalee</option>
                  <option value='Vavuniya'>Vavuniya</option>
                </select>
                {formik.touched.location && formik.errors.location && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.location}</div>
                  </div>
                )}
              </div>
            </div>


            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>
                <span className='required'>Country</span>
              </label>

              <div className='col-lg-8 fv-row'>
                <select
                  className='shadow-sm form-select form-select-solid form-select-lg fw-bold'
                  {...formik.getFieldProps('country')}
                >
                  <option value=''>Select a Country</option>
                  {countries.map((country) => (
                    <option key={country.cca2} value={country.cca2}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
                {formik.touched.country && formik.errors.country && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.country}</div>
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
    </div>
  )
}

export { ProfileDetails }
