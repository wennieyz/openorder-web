import {CheckCircleOutline} from '@mui/icons-material'
import {Meta, StoryObj} from '@storybook/react'
import DSBadge from '.'

const meta = {
  title: 'Design System/Badge', // 👈 The title you'll see in the story's sidebar in Storybook
  component: DSBadge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DSBadge>

export default meta
type Story = StoryObj<typeof meta>

// 👇 Throws a type error it the args don't match the component props
export const Gray: Story = {
  name: 'Gray (Default)',
  args: {
    text: 'Badge',
  },
}

export const Blue: Story = {
  args: {
    color: 'blue',
    text: 'Badge',
  },
}

export const Red: Story = {
  args: {
    color: 'red',
    text: 'Badge',
  },
}

export const Green: Story = {
  args: {
    color: 'green',
    text: 'Badge',
  },
}

export const Yellow: Story = {
  args: {
    color: 'yellow',
    text: 'Badge',
  },
}

export const Purple: Story = {
  args: {
    color: 'purple',
    text: 'Badge',
  },
}

export const White: Story = {
  args: {
    color: 'white',
    text: 'Badge',
  },
}

export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    text: 'Badge',
    icon: <CheckCircleOutline fontSize='small' />,
    iconPosition: 'end',
    color: 'white',
  },
}
