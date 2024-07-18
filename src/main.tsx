import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Marketplace from './pages/Marketplace/index.tsx'
import theme from './theme.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error! TODO: create an error component</div>,
  },
  {
    path: '/marketplace',
    element: <Marketplace />,
    errorElement: <div>Error! TODO: create an error component</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
