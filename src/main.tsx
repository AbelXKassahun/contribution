import { BrowserRouter } from "react-router-dom"

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // required for components to work correctly. If you override these styles, some components might not work as expected.
import './index.css'
import { CustomTheme } from '../libs/theme'
import App from './app/App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={CustomTheme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
)