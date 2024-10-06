import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
import { TablesWidget15 } from '../../../_metronic/partials/widgets'




const BillingPage = () => {
  return (
    <>
     

      <PaymentMethods />


      <TablesWidget15 className='card-xl-stretch mb-xl-8' />
    </>
  )
}


const BillingWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.BILLING' })}</PageTitle>
      <BillingPage />
    </>
  )
}

export { BillingWrapper }



const PaymentMethods = () => {
  return (
    null
    // <>
    //   <div className='card mb-5 mb-xl-10'>
    //     <div className='card-header border-0 pt-5'>
    //       <h3 className='card-title align-items-start flex-column'>
    //         <span className='card-label fw-bold fs-3 mb-1'>Payment Details</span>

    //       </h3>
    //     </div>
    //     <div className='card-body pt-9 '>


    //       <div className="row gx-9 gy-6">
    //         <div className="col-12" data-kt-billing-element="card">
    //           <div className="container">
    //             <div className="credit-card mx-auto">
    //               <div className="credit-card-front">
    //                 <div className="d-flex justify-content-between">
    //                   <img src="data:image/png;base64,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" alt="Chip" width="50" />
    //                   <div className="hologram"></div>
    //                 </div>
    //                 <div className="card-number">
    //                   4539 1488 0343 6467
    //                 </div>
    //                 <div className="d-flex justify-content-between align-items-end">
    //                   <div>
    //                     <div className="card-holder mb-1">John Doe</div>
    //                     <div className="card-expires">Valid Thru: 12/25</div>
    //                   </div>
    //                   <img src="https://preview.keenthemes.com/metronic8/demo36/assets/media/svg/card-logos/visa.svg" alt="Visa" width="60" />
    //                 </div>
    //               </div>
    //               <div className="credit-card-back">
    //                 <div className="magnetic-strip"></div>
    //                 <div className="cvv">
    //                   <span className="me-2">CVV</span>123
    //                 </div>
    //                 <div className="card-details p-3">
    //                   This card is property of Our Bank. Misuse is criminal offence. If found, please return to Our Bank or to
    //                   the nearest bank.
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>




    //         <div className="col-xl-6" data-kt-billing-element="card">
    //           <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">
    //             <div className="d-flex flex-column py-2">
    //               <div className="d-flex align-items-center fs-4 fw-bold mb-5">
    //                 Marcus Morris
    //                 <span className="badge badge-light-success fs-7 ms-2">Primary</span>
    //               </div>
    //               <div className="d-flex align-items-center">
    //                 <img src="https://preview.keenthemes.com/metronic8/demo36/assets/media/svg/card-logos/visa.svg" alt="" className="me-4" />
    //                 <div>
    //                   <div className="fs-4 fw-bold">Visa **** 1679</div>
    //                   <div className="fs-6 fw-semibold text-gray-500">Card expires at 09/24</div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="d-flex align-items-center py-2">
    //               <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="card-delete">
    //                 <span className="indicator-label">Delete</span>
    //                 <span className="indicator-progress">
    //                   Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
    //                 </span>
    //               </button>
    //               <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">Edit</button>
    //             </div>
    //           </div>
    //         </div>
    //         {/* <div className="col-xl-6" data-kt-billing-element="card">
    //           <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">
    //             <div className="d-flex flex-column py-2">
    //               <div className="d-flex align-items-center fs-4 fw-bold mb-5">
    //                 Jacob Holder
    //               </div>
    //               <div className="d-flex align-items-center">
    //                 <img src="https://preview.keenthemes.com/metronic8/demo36/assets/media/svg/card-logos/mastercard.svg" alt="" className="me-4" />
    //                 <div>
    //                   <div className="fs-4 fw-bold">Mastercard **** 2040</div>
    //                   <div className="fs-6 fw-semibold text-gray-500">Card expires at 10/22</div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="d-flex align-items-center py-2">
    //               <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="card-delete">
    //                 <span className="indicator-label">Delete</span>
    //                 <span className="indicator-progress">
    //                   Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
    //                 </span>
    //               </button>
    //               <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">Edit</button>
    //             </div>
    //           </div>
    //         </div> */}


    //         <div className="col-xl-6">
    //           <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed h-lg-100 p-6">
    //             <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
    //               <div className="mb-3 mb-md-0 fw-semibold">
    //                 <h4 className="text-gray-900 fw-bold">Important Note!</h4>
    //                 <div className="fs-6 text-gray-700 pe-7">Please carefully read <a href="#" className="fw-bold me-1">Product Terms</a> adding <br/> your new payment card</div>
    //               </div>
    //               <a href="#" className="btn btn-primary px-6 align-self-center text-nowrap" data-bs-toggle="modal" data-bs-target="#kt_modal_new_card">
    //                 Add Card
    //               </a>
    //             </div>
    //           </div>
    //         </div>



    //         <div className="col-xl-6" data-kt-billing-element="card">
    //           <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6">
    //             <div className="d-flex flex-column py-2">
    //               <div className="d-flex align-items-center fs-5 fw-bold mb-5">
    //                 Address 1
    //                 <span className="badge badge-light-success fs-7 ms-2">Primary</span>
    //               </div>

    //               <div className="fs-6 fw-semibold text-gray-600">
    //                 Ap #285-7193 Ullamcorper Avenue<br />
    //                 Amesbury HI 93373<br />US
    //               </div>
    //             </div>

    //             <div className="d-flex align-items-center py-2">
    //               <button className="btn btn-sm btn-light btn-active-light-primary me-3" data-kt-billing-action="address-delete">
    //                 <span className="indicator-label">Delete</span>
    //                 <span className="indicator-progress">
    //                   Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
    //                 </span>
    //               </button>
    //               <button className="btn btn-sm btn-light btn-active-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_new_address">Edit</button>
    //             </div>
    //           </div>

    //         </div>


    //       </div>
    //     </div>
    //   </div>

    // </>
  )
}