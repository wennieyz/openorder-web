import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles'
import type {Preview} from '@storybook/react'
import theme from '../src/theme.ts'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    story => (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{story()}</ThemeProvider>
      </StyledEngineProvider>
    ),
  ],
}

export default preview
