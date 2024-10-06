/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { defaultReqPost } from '../../../../app/request/main'
import { TrigToast } from '../../../../app/request/Toast'

type Props = {
  className: string
  data?: any,
  setRefresh?: any,
  refresh?: any
}

const TablesWidget16: React.FC<Props> = ({ className, data, refresh, setRefresh }) => {

  const [countryNames, setCountryNames] = useState<Record<string, string>>({});

  const getCountryName = async (countryCode: string): Promise<string> => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode.toUpperCase()}`);
      if (!response.ok) {
        throw new Error('Country not found');
      }
      const countryData = await response.json();
      return countryData[0].name.common; // Return country name
    } catch (err) {
      console.error(err);
      return ""; // Return an empty string on error
    }
  };

  useEffect(() => {
    const fetchCountryNames = async () => {
      const names: Record<string, string> = {}; // Object to hold country code to name mapping
      const fetchPromises = data.data.map(async (val: any) => {
        const name = await getCountryName(val.country); // Fetch country name
        names[val.country] = name; // Store in names object
      });
      await Promise.all(fetchPromises); // Wait for all fetches to complete
      setCountryNames(names); // Update state with country names
    };

    fetchCountryNames();
  }, [data]);


  const approveReg = async (id: string) => {
    try {
     
      const response = await defaultReqPost({ id: id }, 'control/update-state');
      setRefresh(!refresh)
      TrigToast("Registration Approved", "success")
    } catch (error: any) {
      console.log(error)
      setRefresh(!refresh)
      TrigToast("Something Went Wrong", "error")
    }
  }

  return (

    data ?
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>{data.title}</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{data.SubTitle}</span>
          </h3>

        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted bg-light'>
                  {data.headers.map((val: any, index: any) => {
                    return (
                      <th key={index} className='min-w-125px'>{val}</th>
                    )
                  })}

                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {data.data.map((val: any, index: any) => {
                  return (
                    <tr>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-50px me-5'>

                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <a className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                              {val.name}
                            </a>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                              {val.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {countryNames[val.country] || 'Loading...'}

                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>{val.country}</span>
                      </td>
                      <td>
                        <a className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {val.admin.email}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>&nbsp;</span>
                      </td>
                      <td>
                        <a className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {val.admin.firstName} {val.admin.lastName}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>&nbsp;</span>
                      </td>
                      <td>
                        <span className={data.state.class}>{data.state.text}</span>
                      </td>
                      {data.state.text == "Pending" ?
                        <>
                          <td>
                            <button onClick={() => { approveReg(val.id) }} className="btn btn-sm btn-light-primary fw-bolder" id="kt_drawer_chat_toggle">
                              <i className="fa fa-check" aria-hidden="true"></i> Accept
                            </button>
                          </td>


                        </>
                        : null}
                    </tr>
                  )
                })}

              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
      : null

  )
}

export { TablesWidget16 }
