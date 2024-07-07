import { Button, Typography } from "@mui/material"
import Header from "../components/Header"
import ProductCard, { TProductCardProps } from "../components/design-system/ProductCard"
import styles from './styles.module.css'
import DSDropdown from "../components/design-system/DSDropdown"
import { baseColors } from "../styleVariables"


const mockProducts: TProductCardProps[] = [
  {
    brandName: 'Baggu',
    imgUrl: 'src/assets/productImages/duck-bag.png',
    productTitle: 'Duck Bag',
    price: 10,
    isPriceMin: true,
    minQuantity: '1',
    processingTime: '1-2 days',
    variants: ['Yellow', 'Blue', 'Green'],
    iconTags: ['Globe', 'Recycle', 'Leaf']
  },
  {
    brandName: 'Baggu',
    imgUrl: 'src/assets/productImages/duck-bag.png',
    productTitle: 'Duck Bag',
    price: 10,
    isPriceMin: true,
    minQuantity: '1',
    processingTime: '1-2 days',
    variants: ['Yellow', 'Blue', 'Green'],
    iconTags: ['Globe', 'Recycle', 'Leaf']
  },
  {
    brandName: 'Baggu',
    imgUrl: 'src/assets/productImages/duck-bag.png',
    productTitle: 'Duck Bag',
    price: 10,
    isPriceMin: true,
    minQuantity: '1',
    processingTime: '1-2 days',
    variants: ['Yellow', 'Blue', 'Green'],
    iconTags: ['Globe', 'Recycle', 'Leaf'],
  },
  {
    brandName: 'Baggu',
    imgUrl: 'src/assets/productImages/duck-bag.png',
    productTitle: 'Duck Bag',
    price: 10,
    isPriceMin: true,
    minQuantity: '1',
    processingTime: '1-2 days',
    variants: ['Yellow', 'Blue', 'Green'],
    iconTags: ['Globe', 'Recycle', 'Leaf'],
  },
  {
    brandName: 'Baggu',
    imgUrl: 'src/assets/productImages/duck-bag.png',
    productTitle: 'Duck Bag',
    price: 10,
    isPriceMin: true,
    minQuantity: '1',
    processingTime: '1-2 days',
    variants: ['Yellow', 'Blue', 'Green'],
    iconTags: ['Globe', 'Recycle', 'Leaf'],
  }
]

const Marketplace = () => {
  return (
    <div className={styles.marketplace}>
      <Header />
      <div className={styles.middleSection}>
        <div className={styles.headerSection}>
          <Typography color={`${baseColors['--gray-90']}`}variant="h1" fontWeight={500}>Welcome to the Marketplace</Typography>
          <Button color="secondary" children="Work with us" />
        </div>
        <Typography width={500} color={`${baseColors['--gray-80']}`} variant="h3" fontWeight={400}>
          Explore thousands of products for corporate merchandising and gifting
        </Typography>
        <div className={styles.dropdowns}>
          <DSDropdown
            helperText="Minimum"
            onChange={() => {}}
            title="Lead time"
            options={[{label: 'Less than 24', value: 'Less than 24'}]}
            value='Less than 24'
          />
          <DSDropdown
            onChange={() => {}}
            title="Lead time"
            options={[{label: '1 day', value: '1 day'}]}
          />
          <DSDropdown
            onChange={() => {}}
            title="Price"
            options={[{label: '1 day', value: '1 day'}]}
          />
          <DSDropdown
            onChange={() => {}}
            title="Color"
            options={[{label: '1 day', value: '1 day'}]}
          />
          <DSDropdown
            onChange={() => {}}
            title="Impact"
            options={[{label: '1 day', value: '1 day'}]}
          />
        </div>
      </div>
      <div className={styles.products}>
        {mockProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  )

}

export default Marketplace