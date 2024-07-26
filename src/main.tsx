import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom'
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
    path: '/marketplace/:page?',
    element: <Marketplace />,
    loader: ({params}) => {
      if (!params.page) {
        return redirect('/marketplace/discover')
      }

      console.log('page param', params.page)
      return null
      // return fetchTeam(params.page)
    },
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
