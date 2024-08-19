/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTIcon } from '../../../helpers'

type Props = {
  className: string
}

const TablesWidget15: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Billing History</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 Entries</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          {/* begin::Menu 2 */}
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
            data-kt-menu='true'
          >
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content fs-6 text-dark fw-bold px-3 py-4'>Quick Actions</div>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mb-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Ticket
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Customer
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div
              className='menu-item px-3'
              data-kt-menu-trigger='hover'
              data-kt-menu-placement='right-start'
              data-kt-menu-flip='left-start, top'
            >
              {/* begin::Menu item */}
              <a href='#' className='menu-link px-3'>
                <span className='menu-title'>New Group</span>
                <span className='menu-arrow'></span>
              </a>
              {/* end::Menu item */}
              {/* begin::Menu sub */}
              <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Admin Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Staff Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Member Group
                  </a>
                </div>
                {/* end::Menu item */}
              </div>
              {/* end::Menu sub */}
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Contact
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mt-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content px-3 py-3'>
                <a className='btn btn-primary btn-sm px-4' href='#'>
                  Generate Reports
                </a>
              </div>
            </div>
            {/* end::Menu item */}
          </div>
          {/* end::Menu 2 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>

                <th className='min-w-140px'>Date</th>
                <th className='min-w-120px'>Description</th>
                <th className='min-w-120px'>Amount</th>
                <th className='min-w-120px'>Subscription Type</th>
                <th className='min-w-120px'>Invoice Id</th>

              </tr>
            </thead>
          
            <tbody>
              {Array.from({ length: 10 }, (_, index) => index + 1).map((index)=>{
                return(
                  <tr key={index} >
                  <td >
                    <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                      Nov 01, 2024
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      Invoice for November 2024
                    </a>
                  
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      $123.79
                    </a>
                   
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      <span className='badge badge-light-success'>Annual</span>
                    </a>
  
                  </td>
  
                  <td>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      xD23429338
                    </span>
                  </td>
  
                </tr>
                )
              })}
           


            </tbody>
            {/* end::Table body */}
          </table>
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
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export { TablesWidget15 }
