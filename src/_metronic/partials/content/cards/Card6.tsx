/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../helpers'
import { useNavigate } from 'react-router-dom'

type Props = {
  color?: string
  avatar?: string
  online?: boolean
  name: string
  type: string
  rating: string
  totalEarnings: string
  message?: string,
  id: string
}

const Card6: FC<Props> = ({
  id = "",
  color = '',
  avatar = '',
  online = false,
  name,
  type,
  rating,
  totalEarnings,
  message = "Schedule Movie"
}) => {

  const navigate = useNavigate();
  return (
    <div className='card'>
      <div className='card-body d-flex flex-center flex-column p-5'>
        <div className='mb-5'>
          <div className='symbol symbol-150px symbol-circle'>
            {color ? (
              <span className={`symbol-label bg-light-${color} text-${color} fs-5 fw-bolder`}>
                {name.charAt(0)}
              </span>
            ) : (
              <img alt='Pic' style={{ objectFit: "contain" }} src={avatar} />
            )}
            {online && (
              <div className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n3 mt-n3'></div>
            )}
          </div>
        </div>

        <a href='#' className='fs-4 text-gray-800 text-hover-primary fw-bolder mb-0'>
          {name}
        </a>

        <div className='fw-bold text-gray-400 mb-6'>{type}</div>

        <div className='d-flex flex-center flex-wrap mb-5'>
          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mx-3 mb-3'>
            <div className='fs-6 fw-bolder text-gray-700 d-flex flex-center '>{rating}</div>
            <div className='fw-bold text-gray-400 d-flex flex-center'>Rating</div>
          </div>

          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 mx-3 px-4 mb-3'>
            <div className='fs-6 fw-bolder text-gray-700 d-flex flex-center'>{totalEarnings}</div>
            <div className='fw-bold text-gray-400 d-flex flex-center'>Total Schedulings</div>
          </div>
        </div>

        <button onClick={() => {
          navigate('schedule-movie', {
            state: {id:id},
          });
        }} className='btn btn-sm btn-light-primary fw-bolder' id='kt_drawer_chat_toggle'>
          {message}
        </button>
      </div>
    </div>
  )
}

export { Card6 }
