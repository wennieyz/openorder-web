
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Badge  } from '@mui/material';


const meta = {
  title: 'Design System/Badge', //👈 The title you'll see in the story's sidebar in Storybook
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

//👇 Throws a type error it the args don't match the component props
const Primary: Story = {
  args: {
    children: 'Badge',
    color: 'purple',
  },

}

export {
  Primary,
}