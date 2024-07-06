import { StoryObj } from '@storybook/react'
import Marketplace from '.'

const meta = {
  title: 'Marketplace / Landing Page',
  component: Marketplace,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // args: { onChange: fn() },
  decorators: [
    (Story: any) => (
      <div style={{ width: '1000px', height: '100%' }}>
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

const Default: Story = {
  args: {
    numItemsInBag: 0,
  },
}

const WithItemsInBag: Story = {
  args: {
    numItemsInBag: 3,
  },
}
export {
  Default,
  WithItemsInBag
}
