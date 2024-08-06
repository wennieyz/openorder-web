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
        // get the price OBJ from the DB
        let priceObj = part.pricing
        // Get the first FOB ID from the pricing JSON object
        if (Object.keys(priceObj) && Object.keys(priceObj).length > 0) {
          const firstFobId = Object.keys(priceObj)
          if (firstFobId) {
            // get the pricing array for the first FOB ID for each partId
            const pricingArray = priceObj[firstFobId]
            // get the minimum quantity from the first element's minQuantity(which is the highest price but has the minimum quantity)
            firstMinQuantity = pricingArray[0]?.minQuantity || 0
            // get the lowest aviable price which is the last element's price in the price array(need higest quantity to order)
            lastPrice = pricingArray[pricingArray.length - 1]?.price || 0
          }
        } else {
          console.error('No price array in pricing field:', priceObj)
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
          variants: colors,
          processingTime: part.leadTime,
          iconTags: ['Globe', 'Recycle', 'Leaf'],
          productId: String(product.id),
        }
      }

      // Return a default structure if no parts are found?
    })

    return await Promise.all(productInfoPromises)
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Internal Server Error')
  }
}

export default fetchAllProductInfoFromDB
