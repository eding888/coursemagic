import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalizationProvider>
        <Routes />
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
