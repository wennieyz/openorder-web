import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import theme from './theme.ts'
import Marketplace from './Marketplace/index.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Marketplace />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
