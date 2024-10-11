import { createRoot } from 'react-dom/client'
// Axios
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
// Apps
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
import './_metronic/assets/custom/custom.css'


import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './app/routing/AppRoutes'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ToastContainer, toast } from 'react-toastify';

// setupAxios(axios)
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>
        
        <GoogleOAuthProvider clientId={"473511995919-kpjg0pkcmo6ckcrbt6v1l96ssa6gooh7.apps.googleusercontent.com"}>
          <AppRoutes />
          <ToastContainer />
        </GoogleOAuthProvider>

      
      </MetronicI18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
