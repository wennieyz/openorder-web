import {Grid, Typography} from '@mui/material'
import DSBadge from '@/components/design-system/DSBadge'
import DSDropdown from '@/components/design-system/DSDropdown'
import {baseColors} from '@/styleVariables'
import styles from './styles.module.css'

const ProductPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography variant='h4' color={baseColors['--gray-90']} children='Baggu' />
      </div>
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
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductPage
