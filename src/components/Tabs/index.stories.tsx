import {StoryObj} from '@storybook/react'
import {fn} from '@storybook/test'
import DSTabs from '.'

const meta = {
  title: 'Marketplace / Tabs',
  component: DSTabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {onChange: fn()},
}

export default meta
type Story = StoryObj<typeof meta>

const Primary: Story = {}
export {Primary}
