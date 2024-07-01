
import { CheckCircleOutline } from '@mui/icons-material'
import { Meta, StoryObj } from '@storybook/react'
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
const Gray: Story = {
  name: 'Gray (Default)',
  args: {
    text: 'Badge',
  },
}

const Blue: Story = {
  args: {
    color: 'blue',
    text: 'Badge',
  },
}

const Red: Story = {
  args: {
    color: 'red',
    text: 'Badge',
  },
}

const Green: Story = {
  args: {
    color: 'green',
    text: 'Badge',
  },
}

const Yellow: Story = {
  args: {
    color: 'yellow',
    text: 'Badge',
  },
}

const Purple: Story = {
  args: {
    color: 'purple',
    text: 'Badge',
  },
}

const White: Story = {
  args: {
    color: 'white',
    text: 'Badge',
  },
}

const WithIcon: Story = {
  name: 'With Icon',
  args: {
    text: 'Badge',
    icon: <CheckCircleOutline fontSize='small'/>,
    iconPosition: 'end',
    color: 'white'
  }
}


export {
  Blue, Gray, Green, Purple, Red, White,
  WithIcon, Yellow
}
