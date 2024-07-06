type TProductCardProps = {
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

const ProductCard = (props: TProductCardProps) => {

  return (
    <div>
      ProductCard
      <img src={props.imgUrl} alt="product" />
    </div>
  )

}

export default ProductCard