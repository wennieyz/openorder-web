import {Button, Grid, Typography} from '@mui/material'
import DSDropdown from '@/components/design-system/DSDropdown'
import Header from '@/components/Header'
import ProductCard, {TProductCardProps} from '@/components/ProductCard'
import {baseColors} from '@/styleVariables'
import styles from './styles.module.css'

export type TMarketplacePages = 'discover' | 'favorites' | 'brands' | 'categories'

type TProps = {
  page: TMarketplacePages // TODO: should probs make this a mapping/enum at some point
  products: TProductCardProps[]
}

const MarketplacePage = (props: TProps) => {
  return (
    <div>
      <Header page={props.page} />
      <div className={styles.middleSection}>
        <div className={styles.headerSection}>
          <Typography
            color={`${baseColors['--gray-90']}`}
            variant='h1'
            fontWeight={500}
          >
            Welcome to the Marketplace
          </Typography>
          <Button color='secondary' children='Work with us' />
        </div>
        <Typography
          width={500}
          color={`${baseColors['--gray-80']}`}
          variant='h3'
          fontWeight={400}
          textAlign='left'
        >
          Explore thousands of products for corporate merchandising and gifting
        </Typography>
        <div className={styles.dropdowns}>
          <DSDropdown
            helperText='Minimum'
            onChange={() => {
              /* TODO: need to fill this out */
            }}
            title='Lead time'
            options={[
              {label: 'Less than 24', value: 'Less than 24'},
              {label: '1 day', value: '1 day'},
              {label: '2 days', value: '2 days'},
            ]}
            value='Less than 24'
          />
          <DSDropdown
            onChange={() => {
              /* TODO: need to fill this out */
            }}
            title='Lead time'
            options={[{label: '1 day', value: '1 day'}]}
          />
          <DSDropdown
            onChange={() => {
              /* TODO: need to fill this out */
            }}
            title='Price'
            options={[{label: '1 day', value: '1 day'}]}
          />
          <DSDropdown
            onChange={() => {
              /* TODO: need to fill this out */
            }}
            title='Color'
            options={[{label: '1 day', value: '1 day'}]}
          />
          <DSDropdown
            onChange={() => {
              /* TODO: need to fill this out */
            }}
            title='Impact'
            options={[{label: '1 day', value: '1 day'}]}
          />
        </div>
      </div>
      {/* <div className={styles.products}> */}
      <Grid container spacing={3}>
        {props.products.map(product => (
          <Grid key={product.productId} item xs={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
      {/* </div> */}
    </div>
  )
}

export default MarketplacePage
