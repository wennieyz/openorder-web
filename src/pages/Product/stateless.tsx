import {Button, Grid, Typography} from '@mui/material'
import DSBadge from '@/components/design-system/DSBadge'
import DSDropdown from '@/components/design-system/DSDropdown'
import Header from '@/components/Header'
import {baseColors} from '@/styleVariables'
import ProductDetailsCustomization from './ProductDetailsCustomization'
import SizeTable from './SizeTable'
import styles from './styles.module.css'

type TProps = {
  minQuantity: number
  sizeToQuantity?: Record<string, number>
  productDetails: string
  customizationInfo: string
}

const ProductPage = (props: TProps) => {
  return (
    <div className={styles.page}>
      {/* TODO: wennie fix this header page situation*/}
      <Header page='discover' />
      <Grid container className={styles.mainContent}>
        <Grid item xs={6}>
          <img style={{width: '100%'}} src='/productImages/duck-bag.png' />
        </Grid>
        <Grid item xs={6} className={styles.productInfoSection}>
          <div className={styles.productTitleRow}>
            <Typography
              variant='h2'
              color={baseColors['--gray-90']}
              children='Duck Bag'
            />
            <DSBadge text='10-20 days' />
          </div>
          <DSBadge text='Plants a tree' />
          <div className={styles.colorsSection}>
            <Typography variant='caption' children='Colors' />
          </div>
          <div className={styles.productSpecsSection}>
            <DSDropdown
              onChange={() => null}
              options={[
                {label: 'Yes', value: 'yes'},
                {label: 'No', value: 'no}'},
              ]}
              title='Lined filler'
              helperText='Lined filler'
            />
          </div>
          <div className={styles.orderSpecsSection}>
            <DSDropdown
              onChange={() => null}
              options={[
                {label: 'Yes', value: 'yes'},
                {label: 'No', value: 'no}'},
              ]}
              title='Location'
              helperText='Location'
            />
            <DSDropdown
              onChange={() => null}
              options={[
                {label: 'Yes', value: 'yes'},
                {label: 'No', value: 'no}'},
              ]}
              title='Screen Print'
              helperText='Screen Print'
            />
            <DSDropdown
              onChange={() => null}
              options={[
                {label: 'Yes', value: 'yes'},
                {label: 'No', value: 'no}'},
              ]}
              title='Logo'
              helperText='Logo'
            />
            <DSDropdown
              onChange={() => null}
              options={[
                {label: 'Yes', value: 'yes'},
                {label: 'No', value: 'no}'},
              ]}
              title='Color'
              helperText='Color'
            />
          </div>
          {props.minQuantity && (
            <Typography
              variant='paragraph'
              fontWeight={500}
              children={`${props.minQuantity} piece minimum`}
            />
          )}
          {props.sizeToQuantity && (
            <SizeTable sizeToQuantity={props.sizeToQuantity} />
          )}
          <div className={styles.orderFinalSection}>
            <div className={styles.finalOrderRow}>
              <Typography
                color={theme => theme.palette.blue[80]}
                variant='paragraph'
                children='+ Gift Box'
              />
            </div>
            <div className={styles.finalOrderRow}>
              <Typography
                color={theme => theme.palette.blue[80]}
                variant='paragraph'
                children='Gift note added'
              />
              <Typography variant='paragraph' children='+ $5.00' />
            </div>
            <div className={styles.finalOrderRow}>
              <Typography variant='paragraph' children='Item x 24' />
              <Typography variant='paragraph' children='$10.24' />
            </div>
            <div className={styles.finalOrderRow}>
              <Typography
                fontWeight={700}
                color={theme => theme.palette.gray[90]}
                variant='paragraph'
                children='Total Amount'
              />
              <Typography
                fontWeight={700}
                color={theme => theme.palette.gray[90]}
                variant='paragraph'
                children='$286.80'
              />
            </div>
          </div>
          <Button children='Add to cart' />
          <ProductDetailsCustomization
            productDetails={props.productDetails}
            customizationInfo={props.customizationInfo}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductPage
