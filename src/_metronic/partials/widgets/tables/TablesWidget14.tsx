import React, { useState } from 'react';
import { KTIcon } from '../../../helpers'; // Adjust import as per your setup

type Props = {
  className: string;
  data?: any;
  check?: boolean;
  dataReset?: any;
};

const TablesWidget14: React.FC<Props> = ({
  className,
  check = false,
  data = {
    title: 'Latest Movies',
    subTitle: 'Over 1000+ Movies',
    buttonTitle: 'New Movie',
    table: null,
  },
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6; // Rows per page

  // Calculate total pages
  const totalPages = data.table ? Math.ceil(data.table.data.length / rowsPerPage) : 1;

  // Get the data for the current page
  const currentTableData = data.table
    ? data.table.data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
            onClick={() => {
              data.dataReset(null);
            }}
            className='btn btn-sm btn-light-primary'
            data-bs-toggle='modal'
            data-bs-target={'#' + data.target}
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
          {data.table ? (
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 mb-9'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  {check ? (
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
                    </th>
                  ) : null}

                  {data.table.headings.map((val: any, index: number) => {
                    return <th key={index} className='min-w-140px'>{val}</th>;
                  })}
                </tr>
              </thead>

              <tbody>
                {currentTableData.map((row: any, index: number) => {
                  return (
                    <tr key={index}>
                      {data.table.keys.map((col: any, idx: number) => (
                        <td key={idx}>{row[col]}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}

          {/* Pagination */}
          {totalPages > 1 && (
            <ul style={{ position: 'absolute', left: '0', right: '0', bottom: '10px' }} className='pagination'>
              <li className={`page-item previous ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className='page-link' onClick={() => changePage(currentPage - 1)}>
                  <i className='previous'></i>
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className='page-link' onClick={() => changePage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item next ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className='page-link' onClick={() => changePage(currentPage + 1)}>
                  <i className='next'></i>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export { TablesWidget14 };
