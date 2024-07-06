

import { Meta, StoryObj } from '@storybook/react'
import DSIconButton from '.'


const meta = {
  title: 'Design System/Icon Button', // 👈 The title you'll see in the story's sidebar in Storybook
  component: DSIconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DSIconButton>

export default meta
type Story = StoryObj<typeof meta>

const Primary: Story = {
  args: {
    icon: 'ShoppingBag',
    variant: 'primary',
  }
}

export {
  Primary
}