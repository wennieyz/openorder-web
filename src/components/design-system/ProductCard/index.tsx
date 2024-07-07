import { Typography } from '@mui/material'
import styles from './styles.module.css'
import { baseColors } from '../../../styleVariables'
import DSIcon from '../icons/DSIcon'
import { CircleIcon } from '../icons/allIcons'

export type TProductCardProps = {
  imgUrl: string,
  productTitle: string,
  brandName: string,
  price: number,
  isPriceMin?: boolean,
  processingTime: string,
  minQuantity: string,
  variants?: string[],
  iconTags?: string[],
}

const ProductCard = ({
  brandName,
  imgUrl,
  productTitle,
  price,
  isPriceMin,
  minQuantity,
  processingTime,
  iconTags,
  variants,
}: TProductCardProps) => {
  return (
    <div className={styles.productCard}>
      <img src={imgUrl} alt="product" className={styles.img} />
      <div className={styles.brandAndIconsSection}>
        <Typography
          fontWeight={500}
          color={`${baseColors['--gray-50']}`}
          variant="paragraph"
          children={brandName}
          textTransform="uppercase"
        />
        <div className={styles.icons}>
          {iconTags?.map(tag => (
            <DSIcon
              key={tag}
              name={tag}
              color="secondary"
              iconStyleProps={{
                stroke: `${baseColors['--gray-60']}`,
                strokeWidth: '1',
              }}
            />
          ))}
        </div>
      </div>
      <Typography variant="h3" fontWeight="bold" children={productTitle} />
      <Typography
        variant="paragraph"
        children={`$${price}${isPriceMin ? '+' : ''} | QTY ${minQuantity}`}
        fontWeight={500}
        color={`${baseColors['--gray-80']}`}
      />
      <Typography
        variant="paragraph"
        children={processingTime}
        fontWeight={500}
        color={`${baseColors['--gray-80']}`}
      />
      {variants && variants.length && (
        <div className={styles.variants}>
          {variants.slice(0, 6).map(variant => (
            <CircleIcon fill={variant} />
          ))}
          <Typography
            variant="caption"
            children={`+${variants.length > 6 ? variants.length - 6 : variants.length}`}
            color={`${baseColors['--gray-60']}`}
          />
        </div>
      )}
    </div>
  )
}

export default ProductCard