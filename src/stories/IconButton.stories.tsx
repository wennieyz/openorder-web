
import { Meta, StoryObj } from '@storybook/react';
import CheckIcon from '@mui/icons-material/Check';
import { fn } from '@storybook/test';
import { IconButton  } from '@mui/material';


const meta = {
  title: 'Design System/IconButton', //👈 The title you'll see in the story's sidebar in Storybook
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

//👇 Throws a type error it the args don't match the component props
const Primary: Story = {
  args: {
    children: <CheckIcon/>,
  },
}


export {
  Primary,
}