import {Meta, StoryFn, StoryObj} from '@storybook/react'
import React from 'react'
import DSSelectWithChips from '.'

const meta = {
  title: 'Design System/DS Select With Chips', // 👈 The title you'll see in the story's sidebar in Storybook
  component: DSSelectWithChips,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof DSSelectWithChips>

export default meta

type PropsType = React.ComponentProps<typeof DSSelectWithChips>
const Template: StoryFn<PropsType> = (props: PropsType) => {
  const [localValue, setValue] = React.useState<string>('')
  const onChangeInput = (inputValue: string) => {
    setValue(inputValue)
  }
  return <DSSelectWithChips {...props} value={localValue} onChange={onChangeInput} />
}

const options = [
  {value: '1', label: 'Option 1'},
  {value: '2', label: 'Option 2'},
  {value: '3', label: 'Option 3'},
]

export const Default = Template.bind({})
Default.args = {options, title: 'Ages'}
