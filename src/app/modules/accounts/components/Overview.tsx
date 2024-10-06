/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { KTIcon } from '../../../../_metronic/helpers'
import { ChartsWidget1, ListsWidget5, TablesWidget1, TablesWidget5, } from '../../../../_metronic/partials/widgets'
import { defaultReqGet } from '../../../request/main'
import { TrigToast } from '../../../request/Toast'

export function Overview() {
  const [data, setData] = useState<any | null>(null)
  const [countryName, setCountryName] = useState<any|null>(null);
  const auth = localStorage.getItem('auth')
  const { theater } = auth ? (JSON.parse(auth)) : { theater: "" }





  const getData = async () => {
    try {
      const response = await defaultReqGet('profile/details/' + theater);
      setData(response.data.data)
    } catch (error: any) {
      TrigToast("Something Went Wrong", "error")
    }
  }
  useEffect(() => {
    getData()
  }, [])



  

  const getCountryName = async (countryCode: string): Promise<string> => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode.toUpperCase()}`);
      if (!response.ok) {
        throw new Error('Country not found');
      }
      const countryData = await response.json();
      console.log(countryData[0])

      return countryData[0]; 
      // console.log(countryData[0])
    } catch (err) {
      console.error(err);
      return ""; 
    }
  };

  useEffect(() => {
    if(data){
      const fetchCountryNames = async () => {
        const name = await getCountryName(data.theaterData.country); 
        setCountryName(name);
      };
  
      fetchCountryNames();
    }
  }, [data]);

  return (
    <>
      {data ?
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Profile Details</h3>
            </div>

            <Link to='/crafted/account/settings' className='btn btn-primary align-self-center'>
              Edit Profile
            </Link>
          </div>

          <div className='card-body p-9'>
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{data.adminData.first_name} {data.adminData.last_name}</span>
              </div>
            </div>


            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Contact Email</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'> {data.adminData.email}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Role</label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>Theater Admin</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Theater</label>

              <div className='col-lg-8 fv-row'>
                <span className='fw-bold fs-6'>{data.theaterData.name}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>
                Business Email
              </label>

              <div className='col-lg-8 d-flex align-items-center'>
                <span className='fw-bolder fs-6 me-2'>{data.theaterData.business_email}</span>

                <span className='badge badge-success'>Verified</span>
              </div>
            </div>


            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>
                Theater Description
              </label>

              <div className='col-lg-8 d-flex align-items-center'>
                <span className='fw-bolder fs-6 me-2'>{data.theaterData.description}</span>
              </div>
            </div>


            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>
                Address
               
              </label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{data.theaterData.address}</span>
              </div>
            </div>

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>
                Location
               
              </label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{data.theaterData.location}</span>
              </div>
            </div>
            

            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>
                Country
               
              </label>

              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{countryName?countryName.name.common:null}<img src={countryName?countryName.flags.png:null} className='mx-2' style={{objectFit:'contain',width:'40px'}}/></span>
              </div>
            </div>

           

            <div className='row mb-10'>
              <label className='col-lg-4 fw-bold text-muted'>Allow Changes</label>

              <div className='col-lg-8'>
                <span className='fw-bold fs-6'>Yes</span>
              </div>
            </div>


          </div>
        </div>
        : null}


    </>
  )
}
