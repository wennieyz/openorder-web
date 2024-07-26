import {StoryFn, StoryObj} from '@storybook/react'
import ProductCard from '.'

const meta = {
  title: 'Marketplace / Product Card',
  component: ProductCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {imgUrl: '/productImages/duck-bag.png'},
  decorators: [
    (Story: StoryFn) => (
      <div style={{width: '300px', height: '100%'}}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

const Default: Story = {
  args: {
    productId: '1',
    productTitle: 'Duck Bag',
    brandName: 'Baggu',
    price: 12.5,
    processingTime: '7-10 days',
    minQuantity: '24',
    variants: ['red', 'blue', 'green', 'pink', 'yellow', 'purple', 'orange'],
    iconTags: ['Globe', 'Recycle', 'Leaf'],
  },
}

export {Default}
