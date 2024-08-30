import React, { FC } from 'react'
import { Field, ErrorMessage } from 'formik'
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

const Step3: FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

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
    <div className='w-100'>
      <div className='pb-10 pb-lg-12'>
        <h2 className='fw-bolder text-dark'>Theater Details</h2>

      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Theater Name</label>

        <Field name='businessName' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='businessName' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Theater Address</span>
        </label>

        <Field
          name='businessAddress'
          className='form-control form-control-lg form-control-solid'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name='businessAddress' />
        </div>

        <div className='form-text'>
          Customers will see this asaddress of your theater
        </div>
      </div>

      <div className='fv-row mb-0'>
        <label className='fs-6 fw-bold form-label required'>Contact Email</label>

        <Field name='businessEmail' className='form-control form-control-lg form-control-solid' />
        <div className='text-danger mt-2'>
          <ErrorMessage name='businessEmail' />
        </div>
        <div className='form-text'>
          Official Mail to contact theater.This will not be visible to users
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label required'>Location</label>

        <Field
          as='select'
          name='businessLocation'
          className='form-select form-select-lg form-select-solid'
        >
          <option></option>
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
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='businessLocation' />
        </div>
      </div>


      <div className='fv-row mb-10'>
        <label className='form-label required'>Country</label>

        <Field
          as='select'
          name='businessCountry'
          className='form-select form-select-lg form-select-solid'
        >
          <option></option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </Field>
        <div className='text-danger mt-2'>
          <ErrorMessage name='businessCountry' />
        </div>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label'>Theater Description</label>

        <Field
          as='textarea'
          name='businessDescription'
          className='form-control form-control-lg form-control-solid'
          rows={3}
        ></Field>
      </div>


    </div>
  )
}

export { Step3 }
