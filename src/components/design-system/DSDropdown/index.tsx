import {ExpandMoreRounded} from '@mui/icons-material'
import {FormControl, FormHelperText, SelectChangeEvent} from '@mui/material'
import React from 'react'
import StyledSelect, {
  StyledInputForSelect,
  StyledMenuItem,
} from './Subcomponents/Select'

type TDSDropdownOption = {
  disabled?: boolean
  label: string | React.ReactNode
  value: string
}

type TDSDropdownProps = {
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
  options: TDSDropdownOption[]
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

const DSDropdown = ({
  disabled,
  error,
  errorMessage,
  helperText,
  onChange,
  options,
  title,
  value = '',
}: TDSDropdownProps) => {
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
        <StyledSelect
          input={<StyledInputForSelect />}
          IconComponent={ExpandMoreRounded}
          value={value}
          onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
          displayEmpty
          inputProps={{'aria-label': 'Without label'}}
          renderValue={v => (v === '' ? title : optionValueToLabel[v])}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  padding: '4px',
                  '& .MuiList-root.MuiMenu-list': {
                    padding: 0,
                  },
                },
              },
            },
            anchorOrigin: {
              vertical: 40,
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          {options.map(option => (
            <StyledMenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </StyledMenuItem>
          ))}
        </StyledSelect>
        <FormHelperText sx={{marginLeft: '0', fontSize: '14px'}}>
          {errorMessage}
        </FormHelperText>
      </FormControl>
    </>
  )
}

export default DSDropdown
