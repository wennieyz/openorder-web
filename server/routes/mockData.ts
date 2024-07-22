import {TProductCardProps} from '@/components/ProductCard'

const mockDuckBag = {
  brandName: 'Baggu',
  imgUrl: '/productImages/duck-bag.png',
  productTitle: 'Duck Bag',
  price: 10,
  isPriceMin: true,
  minQuantity: '1',
  processingTime: '1-2 days',
  variants: ['Yellow', 'Blue', 'Green'],
  iconTags: ['Globe', 'Recycle', 'Leaf'],
  leadTime: '1-2 days',
}

const mockYeti = {
  brandName: 'Yeti',
  imgUrl:
    'https://www.russells.com/cdn/shop/files/yeti-drinkware-yeti-rambler-30-oz-cosmic-lilac-limited-edition-tumbler-w-magslider-lid-36178053234846_1200x.png?v=1694460754',
  productTitle: 'Yeti',
  price: 20,
  isPriceMin: true,
  minQuantity: '1',
  processingTime: '1-2 days',
  variants: ['Yellow', 'Blue', 'Green'],
  iconTags: ['Globe', 'Recycle', 'Leaf'],
  leadTime: '1-2 days',
}

export const mockMarketplaceDiscoverData: TProductCardProps[] = [
  ...Array(9).keys(),
].map(i => ({...mockDuckBag, productId: i.toString()}))

export const mockMarketplaceFavoritesData: TProductCardProps[] = [
  ...Array(6).keys(),
].map(i => ({...mockYeti, productId: i.toString()}))
