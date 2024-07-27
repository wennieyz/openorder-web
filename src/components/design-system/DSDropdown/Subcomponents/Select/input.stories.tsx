import {Meta, StoryObj} from '@storybook/react'
import {StyledInputForSelect} from '.'

const meta = {
  title: 'Design System/Dropdown/Subcomponents/Input', // 👈 The title you'll see in the story's sidebar in Storybook
  component: StyledInputForSelect,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StyledInputForSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'Enter text',
  },
}

export const Error: Story = {
  args: {
    value: 'Enter text',
    error: true,
  },
}
