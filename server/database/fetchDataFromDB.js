// server/database/fetchAllProductInfoFromDB.js
import DB from './database.js'

const fetchAllProductInfoFromDB = async (page, limit) => {
  try {
    const offset = (page - 1) * limit
    const products = await DB.select('*')
      .from('products')
      .whereNotNull('imageUrl')
      .limit(limit)
      .offset(offset)

    const productInfoPromises = products.map(async product => {
      const parts = await DB.select('*')
        .from('product_partIds')
        .where('productId', product.productId)
        .orderBy('id') // Assuming parts are ordered by their ID
        .limit(1) // Fetching only the first part linked to the product

      if (parts.length > 0) {
        const part = parts[0]
        let firstMinQuantity = 0
        let lastPrice = 0
        // Ensuring the JSON is valid
        let validJsonString = part.pricing
        try {
          const firstFobId = Object.keys(validJsonString)[0]
          if (firstFobId) {
            const pricingArray = validJsonString[firstFobId]
            firstMinQuantity = pricingArray[0]?.minQuantity || 0
            lastPrice = pricingArray[pricingArray.length - 1]?.price || 0
          }
        } catch (e) {
          console.error('Invalid JSON in pricing field:', part.pricing)
        }

        const colors = product.color
          ? product.color.split('; ').map(color => color.split(': ')[1])
          : []

        return {
          brandName: product.brand || 'N/A',
          imgUrl: product.imageUrl,
          productTitle: product.name,
          price: +lastPrice,
          isPriceMin: false,
          minQuantity: firstMinQuantity,
          processingTime: '?',
          variants: colors,
          // variants: ['Yellow', 'Blue', 'Green'],
          // iconTags: product.keyword ? product.keyword.split(',') : [],
          iconTags: product.category ? product.category.split(',') : [],
          iconTags: ['Globe', 'Recycle', 'Leaf'],
          leadTime: part.leadTime,
          productId: String(product.id),
        }
      }

      // Return a default structure if no parts are found?
    })

    // Wait for all promises to resolve
    const productInfos = await Promise.all(productInfoPromises)
    return productInfos
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Internal Server Error')
  }
}

export default fetchAllProductInfoFromDB
