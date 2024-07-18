import {SvgIcon} from '@mui/material'
import icon, {IconName, TIconStyleProps} from './allIcons'
import {baseColors} from '../../../styleVariables'

type TDSIconProps = {
  name: IconName
  color: 'primary' | 'secondary'
  iconStyleProps?: TIconStyleProps
}

const DSIcon = ({color, name, iconStyleProps}: TDSIconProps) => {
  const iconProps = {
    // stroke color needs to be defined here to override svg line color
    ...(color === 'primary' && {stroke: `${baseColors['--white']}`}),
    ...iconStyleProps,
  }
  return <SvgIcon color={color}>{icon(name, iconProps)}</SvgIcon>
}

export default DSIcon
