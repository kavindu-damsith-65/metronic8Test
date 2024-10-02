import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'


const CurrentTheaters=()=>{
    return(
        <>
        </>
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
