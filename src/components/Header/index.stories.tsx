import {StoryFn, StoryObj} from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '.'

const meta = {
  title: 'Marketplace / Header',
  component: Header,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // args: { onChange: fn() },
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter>
        <div style={{width: '800px'}}><Story /></div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    numItemsInBag: 0,
    page: 'discover',
  },
}

export const WithItemsInBag: Story = {
  args: {
    numItemsInBag: 3,
    page: 'discover',
  },
}
