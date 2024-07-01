import { Badge, SvgIconProps } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import styles from './styles.module.css'

type TDSBadgeProps = {
  /**
   * The color of the badge
   * @default 'gray'
   */
  color?: 'purple' | 'green' | 'red' | 'blue' | 'yellow' | 'gray' | 'white'
  /**
   * The text to display in the badge
   */
  text: string
  /**
   * Additional styling classes to apply to the badge
   */
  className?: string
  /**
   * An icon to display in the badge
   */
  icon?: React.ReactElement<SvgIconProps>
  /**
   * The position of the icon in the badge
   * @default 'start'
   */
  iconPosition?: 'start' | 'end'
}

const DSBadge = ({
  color = "gray",
  text,
  className,
  icon,
  iconPosition = 'start',
}: TDSBadgeProps) => {
  return (
    <Badge
      className={classNames(
        className,
        styles.badge,
        iconPosition === "end" && styles.endIcon
      )}
      color={color}
    >
      {icon} {text}
    </Badge>
  )
}

export default DSBadge