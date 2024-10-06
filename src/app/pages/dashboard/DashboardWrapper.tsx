import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import {
  ListsWidget1,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  MixedWidget10,
  MixedWidget11,
  MixedWidget2,
  StatisticsWidget5,
  TablesWidget10,
  TablesWidget5,
} from '../../../_metronic/partials/widgets'
import { AccountHeader } from '../../modules/accounts/AccountHeader'
import { defaultReqPost } from '../../request/main'
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';



const TheaterDashboardPage = () => {
  const localDate = moment();
  const utcDate = localDate.clone().utc();
  const auth = localStorage.getItem('auth')
  const { theater } = auth ? (JSON.parse(auth)) : { theater: "" }

  const [theaterData, setTheaterData] = useState<any | null>(null)

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      const response = await defaultReqPost({
        today: localDate.format('YYYY-MM-DD'),
        theaterId: theater
      }, 'analysis/theater-header');
      setTheaterData(response.data)
    } catch (error) {
      console.error('Error', error);
    }
  }

  return (
    <>

      {theaterData ?
        <>
          <AccountHeader  />




          <div className='row gy-5 g-xl-8'>
          <div className='col-xxl-4'>
              <MixedWidget10
                data={(() => {
                  const i = theaterData.dailyEarninigsData || { dailyEarninigs: [], today: { total_price: 0 } };
                  const prices = i.dailyEarninigs.map((item: any) => parseFloat(item.total_price))
                  const data = {
                    title: "Daily Earnings",
                    subTitle: "Earnings of past 28(max) days",
                    total: i.today? parseFloat(i.today.total_price):0,
                    itemName: "Profit(Rs)",
                    itemValue: prices,
                    columnNames: i.dailyEarninigs.map((item: any) => item.date),
                    ymaX: Math.max(...prices)
                  }
                  return (
                    data
                  )
                })()}
                className='card-xxl-stretch-50 mb-5 mb-xl-8'
                chartColor='warning'
                chartHeight='150px'
              />
              <MixedWidget11
                data={(() => {
                  const i = theaterData.dailyEarninigsData
                  const data = {
                    title: "Daily Sales",
                    subTitle: "Ticket Sales of past 28(max) days",
                    total: parseFloat(i.today.total_tickets),
                    item1Name: "Adult Tickets",
                    item2Name: "Child Tickets",
                    item1Value: i.dailyEarninigs.map((item: any) => parseFloat(item.adult)),
                    item2Value: i.dailyEarninigs.map((item: any) => parseFloat(item.child)),
                    columnNames: i.dailyEarninigs.map((item: any) => item.date),
                  }
                  return (
                    data
                  )
                })()}
                className='card-xxl-stretch-50 mb-5 mb-xl-8'
                chartColor='warning'
                chartHeight='175px'
              />
            </div>


            <div className='col-xxl-4'>
              <MixedWidget10
                data={(() => {
                  const i = theaterData.monthlyEarninigsData
                  let prices = i.monthlyEarninigs.map((item: any) => parseFloat(item.total_price))
                  const data = {
                    title: "Monthly Earnings",
                    subTitle: "Earnings of past 12 months",
                    total: parseFloat(i.thisMonth.total_price),
                    itemName: "Profit(Rs)",
                    itemValue: prices,
                    columnNames: i.monthlyEarninigs.map((item: any) => item.month),
                    ymaX: Math.max(...prices)
                  }
                  return (
                    data
                  )
                })()}
                className='card-xxl-stretch-50 mb-5 mb-xl-8'
                chartColor='success'
                chartHeight='150px'
              />
              <MixedWidget11
                data={(() => {
                  const i = theaterData.monthlyEarninigsData
                  const data = {
                    title: "Monthly Sales",
                    subTitle: "Ticket Sales of 12 months",
                    total: parseFloat(i.thisMonth.total_tickets),
                    item1Name: "Adult Tickets",
                    item2Name: "Child Tickets",
                    item1Value: i.monthlyEarninigs.map((item: any) => parseFloat(item.adult)),
                    item2Value: i.monthlyEarninigs.map((item: any) => parseFloat(item.child)),
                    columnNames: i.monthlyEarninigs.map((item: any) => item.month),
                  }
                  return (
                    data
                  )
                })()}
                className='card-xxl-stretch-50 mb-5 mb-xl-8'
                chartColor='success'
                chartHeight='175px'
              />
            </div>
            <div className='col-xxl-4'>
              <MixedWidget10
                data={(() => {
                  const i = theaterData.yearlyEarninigsData
                  const prices = i.yearlyEarnings.map((item: any) => parseFloat(item.total_price))
                  const data = {
                    title: "Yearly Earnings",
                    subTitle: "Earnings of past 5 years",
                    total: parseFloat(i.thisYear.total_price),
                    itemName: "Profit(Rs)",
                    itemValue: prices,
                    columnNames: i.yearlyEarnings.map((item: any) => item.year),
                    ymaX: Math.max(...prices)
                  }
                  return (
                    data
                  )
                })()}
                className='card-xxl-stretch-50 mb-5 mb-xl-8'
                chartColor='primary'
                chartHeight='150px'
              />
              <MixedWidget11
                data={(() => {
                  const i = theaterData.yearlyEarninigsData
                  const data = {
                    title: "Yearly Sales",
                    subTitle: "Ticket Sales of past 5 years",
                    total: parseFloat(i.thisYear.total_tickets),
                    item1Name: "Adult Tickets",
                    item2Name: "Child Tickets",
                    item1Value: i.yearlyEarnings.map((item: any) => parseFloat(item.adult)),
                    item2Value: i.yearlyEarnings.map((item: any) => parseFloat(item.child)),
                    columnNames: i.yearlyEarnings.map((item: any) => item.year),
                  }
                  return (
                    data
                  )
                })()}
                className='card-xxl-stretch-50 mb-5 mb-xl-8'
                chartColor='primary'
                chartHeight='175px'
              />
            </div>
            {/* <div className='col-xxl-4'>
              <MixedWidget2
                className='card-xl-stretch mb-xl-8'
                chartColor='danger'
                chartHeight='200px'
                strokeColor='#cb1e46'
              />
            </div>
            <div className='col-xxl-4'>
              <ListsWidget5 className='card-xxl-stretch' />
            </div> */}
           
          </div>

          {/* <div className='row gy-5 gx-xl-8 mt-10'>
            <div className='col-xxl-4'>
            <ListsWidget5 className='card-xxl-stretch' />
            </div>
            <div className='col-xl-8'>
              <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
            </div>
          </div> */}
        </>
        : null}
    </>
  )
}

const DashboardWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <TheaterDashboardPage />
    </>
  )
}

export { DashboardWrapper }
