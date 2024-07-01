import { IconButton } from '@mui/material'
import { baseColors } from '../../styleVariables'
import Tabs from '../Tabs'
import DSIcon from '../design-system/icons/DSIcon'
import styles from './styles.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <IconButton
        sx={{
          backgroundColor: `${baseColors['gray-90']}`,
        }}
      >
        <DSIcon name="Home" />
      </IconButton>
      <Tabs onChange={() => {}} />
      <div>
        <IconButton>
          <DSIcon name="MagnifyingGlass" />
        </IconButton>
        <IconButton>
          <DSIcon name="ShoppingBag" />
        </IconButton>
      </div>
    </div>
  )
}

export default Header
