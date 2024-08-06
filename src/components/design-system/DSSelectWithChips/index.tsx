import {ExpandMoreRounded} from '@mui/icons-material'
import {
  ButtonGroup,
  Chip,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material'
import React from 'react'
import StyledSelect, {
  StyledInputForSelect,
  StyledMenuItem,
} from '../DSDropdown/Subcomponents/Select'

type TDSSelectWithChipsOption = {
  disabled?: boolean
  label: string | React.ReactNode
  value: string
}

type TDSSelectWithChips = {
  /**
   * If true, the dropdown will be disabled
   */
  disabled?: boolean

  /**
   * If true, the dropdown will display an error state
   */
  error?: boolean
  /**
   * The error message to display
   */
  errorMessage?: string
  /**
   * Helper text label to display above the dropdown
   */
  helperText?: string
  /**
   * function for performing an action when an option is selected
   * @param item value of options prop that was selected
   */
  onChange: (value: string) => void
  /**
   * Array of dropdown options
   */
  options: TDSSelectWithChipsOption[]
  /**
   * The title of the dropdown
   */
  title: string
  /**
   * The value of the selected dropdown item
   * @default ''
   */
  value?: string
}

const DSSelectWithChips = ({
  disabled,
  error,
  errorMessage,
  helperText,
  onChange,
  options,
  title,
  value = '',
}: TDSSelectWithChips) => {
  const optionValueToLabel: Record<string, string | React.ReactNode> =
    options.reduce(
      (acc, option) => {
        acc[option.value] = option.label
        return acc
      },
      {} as Record<string, string | React.ReactNode>
    )
  // todo: figure out sth out casting ts error

  return (
    <>
      <FormControl size='small' error={error} disabled={disabled}>
        {helperText && (
          <FormHelperText
            sx={{
              color: 'primary.main',
              marginLeft: '0',
              fontSize: '14px',
            }}
          >
            {helperText}
          </FormHelperText>
        )}
        <ButtonGroup variant='outlined' color='primary'>
          <Chip
            label='Colors'
            onDelete={() => console.log('implement on delete')}
            sx={{
              height: '36px',
              borderRadius: '100px 0 0 100px',
              borderRight: 'none',
            }}
          />
          <StyledSelect
            sx={{borderRadius: '0 100px 100px 0'}}
            IconComponent={ExpandMoreRounded}
            input={<StyledInputForSelect />}
            value={value}
            onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
          >
            {options.map(option => (
              <StyledMenuItem key={option.value} value={option.value}>
                {option.label}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </ButtonGroup>
        <FormHelperText sx={{marginLeft: '0', fontSize: '14px'}}>
          {errorMessage}
        </FormHelperText>
      </FormControl>
    </>
  )
}

export default DSSelectWithChips
