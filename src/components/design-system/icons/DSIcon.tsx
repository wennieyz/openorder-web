import { SvgIcon } from "@mui/material"
import allIcons, { IconName } from "./allIcons"

type TDSIconProps = {
  name: IconName
}

const DSIcon = ({name}: TDSIconProps) => {
  return (
    <SvgIcon // TODO: wennie start here add svg icon color props
    >{allIcons[name]}</SvgIcon>
  )
}

export default DSIcon