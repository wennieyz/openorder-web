import {Button} from '@mui/material'
import classNames from 'classnames'
import {useNavigate} from 'react-router-dom'
import DSIconButton from '../design-system/DSIconButton'
import DSIcon from '../design-system/icons/DSIcon'
import DSTabBar from '../DSTabBar'
import styles from './styles.module.css'

type THeaderProps = {
  numItemsInBag?: number
  page: 'discover' | 'favorites' | 'brands' | 'categories'
}

const pageToTabIndex = (
  page: 'discover' | 'favorites' | 'brands' | 'categories'
): number => {
  switch (page) {
    case 'discover':
      return 0
    case 'favorites':
      return 1
    case 'brands':
      return 2
    case 'categories':
      return 3
    default:
      // todo: implement safe unreachable case
      return 0
  }
}

const tabIndexToPage = (tabIndex: number) => {
  switch (tabIndex) {
    case 0:
      return 'discover'
    case 1:
      return 'favorites'
    case 2:
      return 'brands'
    case 3:
      return 'categories'
    default:
      // todo: implement safe unreachable case
      return 'discover'
  }
}

const MARKETPLACE_TABS = ['Discover', 'Favorites', 'Brands', 'Categories']

const Header = ({numItemsInBag, page}: THeaderProps) => {
  const navigate = useNavigate()
  return (
    <div className={styles.header}>
      <DSIconButton icon='Home' variant='primary' />
      <DSTabBar
        tabs={MARKETPLACE_TABS}
        activeTabIndex={pageToTabIndex(page)}
        onChange={(_event, newTabIndex) => {
          console.log(newTabIndex)
          navigate(`/marketplace/${tabIndexToPage(newTabIndex)}`)
        }}
      />
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
