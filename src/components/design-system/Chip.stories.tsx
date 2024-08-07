import {Chip} from '@mui/material'
import {Meta, StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'

const meta = {
  title: 'Design System/Chip', // 👈 The title you'll see in the story's sidebar in Storybook
  component: Chip,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {onClick: fn()},
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

// 👇 Throws a type error it the args don't match the component props
const Primary: Story = {
  args: {
    label: 'Text',
  },
}

const Secondary: Story = {
  args: {
    label: 'Text',
    color: 'secondary',
  },
}

export {Primary, Secondary}
