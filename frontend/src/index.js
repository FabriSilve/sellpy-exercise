import React from 'react'
import ReactDOM from 'react-dom'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';

import App from './App'
import { DataContext } from './DataContext'

ReactDOM.render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
    <DataContext>
      <App />
    </DataContext>
  </LocalizationProvider>,
  document.getElementById('root'),
)
