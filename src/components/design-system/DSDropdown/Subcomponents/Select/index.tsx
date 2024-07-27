import {
  InputBase,
  InputBaseProps,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  styled,
} from '@mui/material'

const StyledSelect = styled(Select)<SelectProps>(({theme, value}) => ({
  '& .Mui-disabled': {
    cursor: 'not-allowed',
  },

  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    paddingBottom: '0px',
  },
  // '.MuiOutlinedInput-notchedOutline': {border: 0},
  '.MuiSelect-icon': {
    color: theme.palette.gray[50],
    // hack for making ExpandMoreRounded icon appear light
    stroke: theme.palette.blue[10],

    '&.Mui-disabled': {
      // hack for making ExpandMoreRounded icon appear light
      // must match background color for disabled
      stroke: theme.palette.gray[10],
    },
  },
  ...(value ? {color: theme.palette.primary.main} : {color: theme.palette.gray[50]}),
})) as unknown as typeof Select

export const StyledInputForSelect = styled(InputBase)<InputBaseProps>(({theme}) => ({
  fontSize: '13px',
  height: '36px',
  background: theme.palette.blue[10],
  border: `1px solid ${theme.palette.blue[30]}`,
  borderRadius: '100px',
  padding: '9px 16px',
  WebkitBoxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  boxSizing: 'border-box',

  '&:hover:not(.Mui-disabled):not(.Mui-error)': {
    border: `2px solid ${theme.palette.blue[80]}`,
    // to make input text not move when hovered or focused
    // used in conjunction with boxSizing: border-box
    padding: '8px 15px',
  },

  '&.Mui-focused:not(.Mui-disabled):not(.Mui-error)': {
    border: `2px solid ${theme.palette.blue[80]}`,
    // to make input text not move when hovered or focused
    // used in conjunction with boxSizing: border-box
    padding: '8px 15px',
    boxShadow: `0px 0px 8px 0px ${theme.palette.blue[80]}`,
  },

  '&.Mui-error': {
    border: `2px solid ${theme.palette.error.main}`,
    // to make input text not move when hovered or focused
    // used in conjunction with boxSizing: border-box
    padding: '8px 15px',
  },

  '&.Mui-disabled': {
    background: theme.palette.gray[10],
    border: `1px solid ${theme.palette.blue[30]}`,
    cursor: 'not-allowed',
  },

  '& input.MuiInputBase-input': {
    // even out top and bottom padding
    paddingTop: '5px;',
  },
})) as typeof InputBase

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({theme}) => ({
  fontSize: '13px',
  color: theme.palette.primary.main,
  minHeight: 'initial',
  borderRadius: '4px',
})) as typeof MenuItem

export default StyledSelect
