/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import noUiSlider from 'nouislider'
import { useLayout } from '../../core'
import { KTIcon } from '../../../helpers'
import { DefaultTitle } from './page-title/DefaultTitle'
import { ThemeModeSwitcher } from '../../../partials'
import { Link } from 'react-router-dom'

const HeaderToolbar = () => {
  const { classes } = useLayout()
  const [status, setStatus] = useState<string>('1')

  useEffect(() => {
    const rangeSlider = document.querySelector('#kt_toolbar_slider')
    const rangeSliderValueElement = document.querySelector('#kt_toolbar_slider_value')

    if (!rangeSlider || !rangeSliderValueElement) {
      return
    }

    // @ts-ignore
    noUiSlider.create(rangeSlider, {
      start: [5],
      connect: [true, false],
      step: 1,
      format: {
        to: function (value) {
          const val = +value
          return Math.round(val).toString()
        },
        from: function (value) {
          return value
        },
      },
      range: {
        min: [1],
        max: [10],
      },
    })

    // @ts-ignore
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      rangeSliderValueElement.innerHTML = values[handle]
    })

    const handle = rangeSlider.querySelector('.noUi-handle')
    if (handle) {
      handle.setAttribute('tabindex', '0')
    }

    // @ts-ignore
    handle.addEventListener('click', function () {
      // @ts-ignore
      this.focus()
    })

    // @ts-ignore
    handle.addEventListener('keydown', function (event) {
      // @ts-ignore
      const value = Number(rangeSlider.noUiSlider.get())
      // @ts-ignore
      switch (event.which) {
        case 37:
          // @ts-ignore
          rangeSlider.noUiSlider.set(value - 1)
          break
        case 39:
          // @ts-ignore
          rangeSlider.noUiSlider.set(value + 1)
          break
      }
    })
    return () => {
      // @ts-ignore
      rangeSlider.noUiSlider.destroy()
    }
  }, [])

  const auth = localStorage.getItem('auth')
  const { theater } = auth ? (JSON.parse(auth)) : { theater: "" }

  return (
    <div className='toolbar d-flex align-items-stretch'>
      {/* begin::Toolbar container */}
      <div
        className={`${classes.headerContainer.join(
          ' '
        )} py-6 py-lg-0 d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-lg-between`}
      >
        <DefaultTitle />
        <div className='d-flex align-items-stretch overflow-auto pt-3 pt-lg-0'>
          {/* begin::Action wrapper */}
          <div className='d-flex align-items-center'>

          </div>
          {/* end::Action wrapper */}



          {/* begin::Action wrapper */}
          <div className='d-flex align-items-center'>
            {/* begin::Label */}
            <span className='fs-7 text-gray-700 fw-bolder  d-none d-xxl-block'>
              Quick Tools:
            </span>
            {/* end::Label */}

            {/* begin::Actions */}
            <div className='d-flex'>
              {/* begin::Action */}
              {theater ?
                <Link to='/crafted/account/settings' className='btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary'>
                  <KTIcon iconName='setting' className='fs-1' />
                </Link>
                : null}




              {/* begin::Theme mode */}
              <div className='d-flex align-items-center'>
                <ThemeModeSwitcher toggleBtnClass='btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary' />
              </div>
              {/* end::Theme mode */}
            </div>
            {/* end::Actions */}
          </div>
          {/* end::Action wrapper */}
        </div>
        {/* end::Toolbar container */}
      </div>
    </div>
  )
}

export { HeaderToolbar }
