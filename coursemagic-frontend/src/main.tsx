import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
        <Routes />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
