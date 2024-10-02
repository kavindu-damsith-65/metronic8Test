/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../helpers'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import { defaultReqDelete } from '../../../../app/request/main'
import { TrigToast } from '../../../../app/request/Toast'

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
  setRefresh:any,
  refresh:any
}

const Card7: FC<Props> = ({
  id = "",
  color = '',
  avatar = '',
  online = false,
  name,
  type,
  rating,
  totalEarnings,
  message = "Schedule Movie",
  refresh,
  setRefresh
}) => {

  const navigate = useNavigate();

  const removeFilm= async ()=>{
    try {
        const response = await defaultReqDelete('films/remove/'+id);
        TrigToast(response.data.message, "success")
        setRefresh(!refresh)
    } catch (error:any) {
        TrigToast(error.response.data.error, "error")
        
    }
}



  return (
    <motion.div whileHover={{scale:1.05}} className='card'>
      <div className='card-body d-flex flex-center flex-column p-5'>
        <div className='mb-5'>
          <div className='symbol symbol-200px ' style={{ height: '300px' }}>
            {color ? (
              <span className={`symbol-label bg-light-${color} text-${color} fs-5 fw-bolder`}>
                {name.charAt(0)}
              </span>
            ) : (
              <img style={{ objectFit: "cover", height: '100%' }} src={avatar} />
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
            <div className='fw-bold text-gray-400 d-flex flex-center'>Duration</div>
          </div>
        </div>

       <div className='d-flex gap-2'>
       <button onClick={() => {
          navigate('/add-movie', {
            state: { id: id },
          });
        }} className='btn btn-sm btn-light-primary fw-bolder' id='kt_drawer_chat_toggle'>
          <i className="fa fa-pencil" aria-hidden="true"></i> Edit Movie
        </button>
        <button onClick={removeFilm} className='btn btn-sm btn-light-danger fw-bolder' id='kt_drawer_chat_toggle'>
          <i className="fa fa-trash" aria-hidden="true"></i> Remove
        </button>
       </div>
      </div>
    </motion.div>
  )
}

export { Card7 }
