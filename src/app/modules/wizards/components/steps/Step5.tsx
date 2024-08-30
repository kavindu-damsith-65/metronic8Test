import React, {FC} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

const Step5: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-8 pb-lg-10'>
        <h2 className='fw-bolder text-dark'>Your Are Done!</h2>
      </div>

      <div className='mb-0'>
        <div className='fs-6 text-gray-600 mb-5'>
        The stage is yours to set, the audience is yours to amaze.
        </div>

        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
          <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
          <div className='d-flex flex-stack flex-grow-1'>
            <div className='fw-bold'>
              <h4 className='text-gray-800 fw-bolder'>We need your attention!</h4>
              <div className='fs-6 text-gray-600'>
              Stay on top of ticket sales and reservations with real-time updates, giving you the power to manage high-demand shows efficiently
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step5}
