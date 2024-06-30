import CheckIcon from '@mui/icons-material/Check'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import theme from './theme.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
        <Button color='primary'>Button</Button>
        <IconButton><CheckIcon/></IconButton>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
