import {Router} from 'express'
import DB from '../database/database.js'
import fetchData from './fetchData.js' // Adjust the path as needed

const router = Router()

const {fetchMediaContent, fetchProductInfos} = fetchData

// All sellable products
router.get('/', async (req, res) => {
  try {
    const products = await DB.select('*').from('products').whereNotNull('imageUrl') // Fetch products where imageUrl is not null
    console.log(products)
    res.render('index', {products})
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

// Single Product Page using DB data and API for media content
router.get('/product/:id', async (req, res) => {
  try {
    const {id} = req.params

    // Fetch product details from the database using the ID
    const product = await DB.select('*').from('products').where({id}).first()
    console.log(product)

    if (!product) {
      return res.status(404).send('Product not found')
    }

    // Fetch media content using the supplier and productId
    const mediaContentResponse = await fetchMediaContent(
      product.supplier,
      product.productId
    )
    const mediaContent = mediaContentResponse.data.MediaContentArray
    console.log('line 39' + JSON.stringify(mediaContent))

    const productInfo = await fetchProductInfos(
      product.supplier,
      product.productId,
      product.partId
    )
    console.log('line 42' + productInfo)

    res.render('single-product', {
      id: id,
      productId: product.productId,
      brand: product.brand,
      productInfo: productInfo,
      mediaContent: mediaContent,
    })
  } catch (error) {
    console.error('Error fetching product details:', error)
    res.status(500).send('Internal Server Error')
  }
})

// use API directly
// router.get('/product/:supplier/:productId', async (req, res, next) => {
//   try {
//     // console.log('line138' + req.params.productId);
//     // console.log('line139' + req.params.supplier);
//     const productId = req.params.productId
//     const supplierCode = req.params.supplier
//     // const thisProductInfoUrl = `${apiBaseUrl}${supplierCode}/ps/product/getProduct/${productId}`;
//     // const mediaContentUrl =`${apiBaseUrl}${supplierCode}/ps/med/getMediaContent/${productId}`;
//     // console.log(thisProductInfoUrl);
//     const productInfo = await fetchProductInfos(supplierCode, productId)
//     const mediaContentResponse = await fetchMediaContent(supplierCode, productId)
//     const mediaContent = mediaContentResponse.data.MediaContentArray

//     console.log('Product Info:', productInfo)
//     console.log('Media Content:', mediaContent)

//     res.render('single-product', {
//       productInfo,
//       mediaContent,
//     })
//   } catch (error) {
//     console.error('Error fetching product data:', error)
//     next(error)
//   }
// })

router.get('/hello', async (req, res, next) => {
  res.send({message: 'Hello from server!'})
})

export default router
