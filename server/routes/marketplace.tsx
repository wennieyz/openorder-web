import {Request, Response, Router} from 'express'
import {TProductData} from '@/components/ProductCard'
import {mockMarketplaceDiscoverData, mockMarketplaceFavoritesData} from './mockData'

const router = Router()

router.get(
  '/discover',
  (_req: Request, res: Response<{products: TProductData[]}>) => {
    res.send({products: mockMarketplaceDiscoverData})
  }
)

/* TODO: implement */
router.get(
  '/favorites',
  (_req: Request, res: Response<{products: TProductData[]}>) => {
    res.send({products: mockMarketplaceFavoritesData})
  }
)

/* TODO: implement */
router.get('/brands', (_req: Request, res: Response<{products: TProductData[]}>) => {
  res.send({products: mockMarketplaceDiscoverData})
})

/* TODO: implement */
router.get(
  '/categories',
  (_req: Request, res: Response<{products: TProductData[]}>) => {
    res.send({products: mockMarketplaceDiscoverData})
  }
)

export default router
