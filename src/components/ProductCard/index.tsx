import {Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import {baseColors} from '@/styleVariables'
import {CircleIcon, IconName, IconNames} from '../design-system/icons/allIcons'
import DSIcon from '../design-system/icons/DSIcon'
import styles from './styles.module.css'

export type TProductData = {
  imgUrl: string
  productTitle: string
  brandName: string
  price: number
  isPriceMin?: boolean
  processingTime: string
  minQuantity: string
  variants?: string[]
  iconTags?: string[]
  productId: string
}

type TProps = {
  product: TProductData
  onClick: () => void
}

const ProductCard = ({
  product: {
    brandName,
    imgUrl,
    productTitle,
    price,
    isPriceMin,
    minQuantity,
    processingTime,
    iconTags,
    variants,
    productId,
  },
  onClick,
}: TProps) => {
  return (
    <Link
      className={styles.productCard}
      to={`/product/${productId}`}
      target='_blank'
    >
      <img src={imgUrl} alt={productTitle} />
      <div className={styles.brandAndIconsSection}>
        <Typography
          fontWeight={500}
          color={`${baseColors['--gray-50']}`}
          variant='paragraph'
          children={brandName}
          textTransform='uppercase'
        />
        <div className={styles.icons}>
          {iconTags?.map(tag => {
            return (
              <DSIcon
                key={tag}
                // todo: wennie find a better workaround for this later
                name={IconNames.includes(tag) ? (tag as IconName) : 'Home'}
                color='secondary'
                iconStyleProps={{
                  stroke: `${baseColors['--gray-60']}`,
                  strokeWidth: '1',
                }}
              />
            )
          })}
        </div>
      </div>
      <Typography variant='h3' fontWeight='bold' children={productTitle} />
      <Typography
        variant='paragraph'
        children={`$${price}${isPriceMin ? '+' : ''} | QTY ${minQuantity}`}
        fontWeight={500}
        color={`${baseColors['--gray-80']}`}
      />
      <Typography
        variant='paragraph'
        children={processingTime}
        fontWeight={500}
        color={`${baseColors['--gray-80']}`}
      />
      {variants && variants.length && (
        <div className={styles.variants}>
          {variants.slice(0, 6).map(variant => (
            <CircleIcon key={variant} fill={variant} />
          ))}
          <Typography
            variant='caption'
            children={`+${variants.length > 6 ? variants.length - 6 : variants.length}`}
            color={`${baseColors['--gray-60']}`}
          />
        </div>
      )}
    </Link>
  )
}

export default ProductCard
