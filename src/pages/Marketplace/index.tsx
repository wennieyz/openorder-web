import {CircularProgress} from '@mui/material'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {TProductCardProps} from '@/components/ProductCard'
import MarketplacePage, {TMarketplacePages} from './stateless'

const Marketplace = () => {
  const {page} = useParams<{page: TMarketplacePages}>()
  const [products, setProducts] = useState<TProductCardProps[] | undefined>(
    undefined
  )

  useEffect(() => {
    axios
      .get<{
        products: TProductCardProps[]
      }>(`http://localhost:3000/marketplace/${page}`)
      .then(res => {
        setProducts(res.data.products)
      })
      .catch((err: unknown) => {
        console.log('implement error handling', err)
      })
  }, [page])

  return (
    // TODO: wennie fix this page should never be undefined
    // TODO: also implement loading page
    <>
      {products ? (
        <MarketplacePage page={page || 'discover'} products={products} />
      ) : (
        <CircularProgress />
      )}
    </>
  )
}

export default Marketplace
