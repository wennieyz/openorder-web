import ProductPage from './stateless'

const mockSizeToQuantity = {
  S: 5,
  M: 10,
  L: 20,
  XL: 5,
  '2XL': 5,
  '3XL': 5,
}

const mockProps = {
  minQuantity: 24,
  sizeToQuantity: mockSizeToQuantity,
  productDetails:
    'Created in a boxy, structured silhouette with solid styling, this crossbody bag is a versatile accessory to pair with everyday outfits. Made with a top flap detailed with CK monogram logo hardware. Features an adjustable shoulder strap for a personalized fit.',
  customizationInfo: 'Customization info',
}
const Product = () => {
  return <ProductPage {...mockProps} />
}

export default Product
