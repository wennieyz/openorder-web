import {Typography} from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
import DSTabBar from '@/components/DSTabBar'

type TProps = {
  // todo: we might be able to just pass this in via hook
  productDetails: string
  customizationInfo: string
}

const ProductDetailsCustomization = (props: TProps) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(0)

  return (
    <div style={{textAlign: 'left'}}>
      {/* TODO: wennie start here fix width */}
      <DSTabBar
        activeTabIndex={activeTabIndex}
        tabs={['Product details', 'Customization']}
        onChange={(_event, newValue) => setActiveTabIndex(newValue)}
      />
      <Typography
        component='div'
        width='100%'
        variant='caption'
        children={
          activeTabIndex === 0 ? props.productDetails : props.customizationInfo
        }
      />
      <div style={{display: 'flex', justifyContent: 'space-between', width: '50%'}}>
        <Link to='#' children='Patagonia' />
        <Link to='#' children='172390-20' />
      </div>
    </div>
  )
}

export default ProductDetailsCustomization
