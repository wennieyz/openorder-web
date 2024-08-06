import {IconButton} from '@mui/material'
import {baseColors} from '../../../styleVariables'
import {IconName} from '../icons/allIcons'
import DSIcon from '../icons/DSIcon'

type TDSIconButtonProps = {
  icon: IconName
  variant: 'primary' | 'secondary'
}

const DSIconButton = ({icon, variant}: TDSIconButtonProps) => {
  return (
    <IconButton color={variant}>
      <DSIcon
        name={icon}
        color={variant}
        iconStyleProps={
          variant === 'primary' ? {stroke: `${baseColors['--white']}`} : undefined
        }
      />
    </IconButton>
  )
}

export default DSIconButton
