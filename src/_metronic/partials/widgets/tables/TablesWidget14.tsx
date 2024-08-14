/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'

type Props = {
  className: string
  data?: any,
  check?: boolean
}

const TablesWidget14: React.FC<Props> = ({ className, check = false, data = {
  title: "Latest Movies",
  subTitle: "Over 1000+ Movies",
  buttonTitle: "New Movie",
  table: null
} }) => {


  return (
    <div className={`card ${className}`}>
     
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>{data.title}</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>{data.subTitle}</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <button

            className='btn btn-sm btn-light-primary'
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter"
          >
            <KTIcon iconName='plus' className='fs-3' />
            {data.buttonTitle}
          </button>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div style={{ position: 'relative' }} className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          {data.table ?
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 mb-9'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  {check ?

                    <th className='w-25px'>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value='1'
                          data-kt-check='true'
                          data-kt-check-target='.widget-9-check'
                        />
                      </div>
                    </th> :
                    null}

                  {data.table.headings.map((val: any, index: number) => {
                    return (
                      <th key={index} className='min-w-140px'>{val}</th>
                    )
                  })}

                </tr>
              </thead>

              <tbody>
                {data.table.data.map((row: any, index: number) => {
                  return (
                    <tr>
                      {data.table.keys.map((col: any, index: number) => {
                        return (
                          <td>
                            {row[col]}

                          </td>
                        )
                      })}


                    </tr>
                  )
                })}


              </tbody>

            </table>
            : null}



          <ul style={{ position: 'absolute', left: '0', right: '0', bottom: '10px' }} className='pagination'>
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

      </div>

    </div>
  )
}

export { TablesWidget14 }
