import CheckIcon from '@mui/icons-material/Check'
import {Button} from '@mui/material'
import {Meta, StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'

const meta = {
  title: 'Design System/Button', // 👈 The title you'll see in the story's sidebar in Storybook
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {onClick: fn()},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    color: 'secondary',
  },
}

export const PrimaryWithIcon: Story = {
  args: {
    children: 'Button',
    startIcon: <CheckIcon />,
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    children: 'Button',
    color: 'secondary',
    startIcon: <CheckIcon />,
  },
}
