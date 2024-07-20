import Tabs from '../Tabs'
import styles from './styles.module.css'
import DSIconButton from '../design-system/DSIconButton'
import {Button} from '@mui/material'
import DSIcon from '../design-system/icons/DSIcon'
import classNames from 'classnames'

type THeaderProps = {
  numItemsInBag?: number
}

const Header = ({numItemsInBag}: THeaderProps) => {
  return (
    <div className={styles.header}>
      <DSIconButton icon='Home' variant='primary' />
      <Tabs onChange={() => {}} />
      <div
        className={classNames(
          styles.endSection,
          numItemsInBag && styles.endSectionWithItems
        )}
      >
        <DSIconButton icon='MagnifyingGlass' variant='secondary' />
        {!numItemsInBag ? (
          <DSIconButton icon='ShoppingBag' variant='secondary' />
        ) : (
          <Button
            startIcon={<DSIcon name='ShoppingBag' color='primary' />}
            color='primary'
          >
            {numItemsInBag} items
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header
