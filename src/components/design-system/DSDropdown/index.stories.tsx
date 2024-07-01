
import CheckIcon from '@mui/icons-material/Check'
import { Meta, StoryFn, } from '@storybook/react'
import { fn } from '@storybook/test'
import React from 'react'
import DSDropdown from '.'


const meta = {
  title: 'Design System/Dropdown', // 👈 The title you'll see in the story's sidebar in Storybook
  component: DSDropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof DSDropdown>

export default meta

type PropsType = React.ComponentProps<typeof DSDropdown>

const Template: StoryFn<PropsType> = (props: PropsType) => {    
  const [localValue, setValue] = React.useState<string>('')
  const onChangeInput = (inputValue: string) => {
      setValue(inputValue)
  }
  return (
      <DSDropdown {...props} value={localValue} onChange={onChangeInput} />
  )
}

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  {
    value: "4",
    label: (
      <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
        <CheckIcon />
        Option 4
      </div>
    ),
  },
]

// 👇 Throws a type error it the args don't match the component props
const Default = Template.bind({})
Default.args = {
    error: false,
    options,
    title: 'Ages'
}

const Error = Template.bind({})
Error.args = {
  error: true,
  errorMessage: "This is an error message",
  options,
  title: 'Ages'
}

const Disabled = Template.bind({})
Disabled.args = {
  error: false,
  disabled: true,
  options,
  title: "Ages",
}

const WithHelperText = Template.bind({})
WithHelperText.args = {
  error: false,
  value: 'Less than 24',
  helperText: 'Minimum',
  title: 'Minimum',
  options: [
    { value: "Less than 24", label: "Less than 24" },
    { value: "24-30", label: "24-30" },
    { value: "30-40", label: "30-40" },
    { value: "40-50", label: "40-50" },
    { value: 'More than 50', label: 'More than 50' }
  ]
}

export {
  Default, Disabled, Error, WithHelperText
}
