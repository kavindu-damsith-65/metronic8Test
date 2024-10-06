import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { TablesWidget16 } from '../../../_metronic/partials/widgets'
import { SubTitle } from 'chart.js'
import { useEffect, useState } from 'react'
import { defaultReqGet, defaultReqPost } from '../../request/main'
import { TrigToast } from '../../request/Toast'

const NotApproved = (data: any) => {
    return (
        {
            title: "Pending Registrations",
            SubTitle: `Total ${data.length} Registrtions Available`,
            headers: ["Name", "Country", "Email", "Admin", "State", "Action"],
            state:{class:"badge badge-light-warning fs-7 fw-semibold",text:"Pending"},
            data: data
        }
    )
}


const Approved = (data: any) => {
    return (
        {
            title: "Approved Registrations",
            SubTitle: `Total ${data.length} Registrtions Approved`,
            headers: ["Name", "Country", "Email", "Admin", "State"],
            state:{class:"badge badge-light-success fs-7 fw-semibold",text:"Approved"},
            data: data
        }
    )
}

const CurrentTheaters = () => {
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState<any | null>(null)


    const getData = async () => {
        try {
            const response = await defaultReqGet('control/current-theaters');
            setData(response.data.data)
        } catch (error: any) {
            TrigToast("Something Went Wrong", "error")
        }
    }
    useEffect(() => {
        getData()
    }, [refresh])
    

    return (
        data ?
            <>
                <TablesWidget16 refresh={refresh} setRefresh={setRefresh} data={NotApproved(data.notVerified)} className='mb-5 mb-xl-8' />
                <TablesWidget16 refresh={refresh} setRefresh={setRefresh} data={Approved(data.verified)} className='mb-5 mb-xl-8' />
            </>
            : null

    )
}




const CurrentTheatersWrapper = () => {
    const intl = useIntl();



    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.MANAGETHEATERS' })}</PageTitle>

            <CurrentTheaters />


        </>
    );
};

export { CurrentTheatersWrapper };
