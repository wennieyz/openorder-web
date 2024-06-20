import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Button from '@mui/material/Button'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts'
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';



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
