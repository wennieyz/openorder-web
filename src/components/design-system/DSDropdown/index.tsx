import {ExpandMoreRounded} from '@mui/icons-material'
import {
  FormControl,
  FormHelperText,
  MenuItem,
  MenuItemProps,
  Select,
  SelectChangeEvent,
  styled,
} from '@mui/material'
import React from 'react'
import {baseColors} from '../../../styleVariables'

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({theme}) => ({
  fontSize: '13px',
  color: theme.palette.primary.main,
  minHeight: 'initial',
}))

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
        <Select
          IconComponent={ExpandMoreRounded}
          value={value}
          sx={{
            ...(!error
              ? {
                  'background': `${baseColors['--blue-10']}`,
                  'boxShadow': 'none',
                  '.MuiOutlinedInput-notchedOutline': {border: 0},
                  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    border: `2px solid ${baseColors['--blue-80']}`,
                  },
                  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                    {
                      border: `2px solid ${baseColors['--blue-80']}`,
                      boxShadow: `0px 0px 8px 0px ${baseColors['--blue-80']}`,
                    },
                }
              : {
                  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                    {
                      border: '2px solid error.main',
                    },
                }),
                ...(value
                  ? {color: 'primary.main'}
                  : {color: `${baseColors['--gray-50']}`}),
            '.MuiSelect-icon': {
              color: 'secondary.main',
              // hack for making ExpandMoreRounded icon appear light
              stroke: `${baseColors['--blue-10']}`,
            },
          '.MuiSelect-select': {
            padding: '9px 34px 9px 16px',
          },
            
            fontSize: '13px',
            height: '36px',
            borderRadius: '100px',
          }}
          onChange={(event: SelectChangeEvent) => onChange(event.target.value)}
          displayEmpty
          inputProps={{'aria-label': 'Without label'}}
          renderValue={v => (v === '' ? title : optionValueToLabel[v])}
          MenuProps={{
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
        </Select>
        <FormHelperText sx={{marginLeft: '0', fontSize: '14px'}}>
          {errorMessage}
        </FormHelperText>
      </FormControl>
    </>
  )
}

export default DSDropdown
