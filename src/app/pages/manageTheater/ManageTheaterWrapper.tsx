import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import {

  StatisticsWidget5,

} from '../../../_metronic/partials/widgets'
import { AccountHeader } from '../../modules/accounts/AccountHeader'

import { TheaterWireFrame } from './DropZone'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';



const TheaterPage = () => (
  <>


    <AccountHeader />

    <div className='row g-5 g-xl-8'>
      <DndProvider backend={HTML5Backend}>
        <div className='col-12'>
        <div className='card p-x py-5' style={{height:'100%'}}>
        <TheaterWireFrame />
        </div>
         
        </div>

       
      </DndProvider>


    </div>



  </>
)

const ManageTheaterWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.MANAGETHEATER' })}</PageTitle>
      <TheaterPage />
    </>
  )
}

export { ManageTheaterWrapper }
