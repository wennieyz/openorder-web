// database/insertData.js
import DB from './database.js'
import fetchData from '../routes/fetchData.js' // Ensure the correct relative path
const {getAllProductData, getConfigurationAndPricing} = fetchData

// Truncate function to ensure the string length does not exceed the specified limit
const truncate = (str, n) =>
  str && str.length > n ? str.substr(0, n - 1) + '...' : str

const insertOrUpdateData = async () => {
  try {
    const allProducts = await getAllProductData()
    const productPartsToInsert = []
    const productIdsInInput = new Set()

    // Start a transaction
    await DB.transaction(async trx => {
      for (const supplierData of allProducts) {
        for (const product of supplierData.products) {
          productIdsInInput.add(`${supplierData.supplier}-${product.productId}`)

          // Upsert products table
          await trx('products')
            .insert({
              supplier: truncate(supplierData.supplier, 255),
              productId: product.productId,
              partId: truncate(product.partIds.join(', '), 1000),
              name: truncate(product.name, 1000),
              brand: truncate(product.brand, 255),
              category: truncate(product.category, 1000),
              color: truncate(product.color, 1000),
              imageUrl: truncate(product.imageUrl, 1000),
              keyword: truncate(product.keyword, 1000),
              effectiveDate: truncate(product.effectiveDate, 255),
            })
            .onConflict(['supplier', 'productId'])
            .merge()

          // Parse and prepare data for product_partIds table
          if (product.partIds && product.color) {
            const partIds = product.partIds.map(id => id.trim())
            const colorMappings = product.color
              .split('; ')
              .reduce((acc, colorMapping) => {
                const [partId, color] = colorMapping
                  .split(': ')
                  .map(item => item.trim())
                acc[partId] = color
                return acc
              }, {})

            //leadtime
            const leadTimeMappings = product.leadTimes.reduce((acc, leadTimeObj) => {
              acc[leadTimeObj.partId] = leadTimeObj.leadTime
              return acc
            }, {})

            // Get pricing data for the product
            const pricingData = await getConfigurationAndPricing(
              supplierData.supplier,
              product.productId
            )

            partIds.forEach(partId => {
              productPartsToInsert.push({
                supplier: truncate(supplierData.supplier, 255),
                productId: product.productId,
                partId: truncate(partId, 1000), // Ensure length limit
                color: truncate(colorMappings[partId] || product.color, 255), // Use the parsed color or fallback to product color
                pricing: JSON.stringify(pricingData[partId] || []), // Ensure length limit
                leadTime: leadTimeMappings[partId] || null,
              })
            })
          }
        }
      }

      // Insert or update parts
      for (const part of productPartsToInsert) {
        await trx('product_partIds')
          .insert(part)
          .onConflict(['supplier', 'productId', 'partId'])
          .merge()
      }

      // Delete entries from products table if the input data no longer contains the corresponding productId
      const deletedProductIds = await trx('products')
        .whereNotIn(
          DB.raw(`supplier || '-' || "productId"`),
          Array.from(productIdsInInput)
        )
        .returning('productId')
        .del()

      // Delete corresponding entries from product_partIds table if productId no longer exists in products table
      if (deletedProductIds.length > 0) {
        await trx('product_partIds')
          .whereIn(
            'productId',
            deletedProductIds.map(d => d.productId)
          )
          .del()
      }

      // Delete entries from product_partIds table if partId no longer exists in products table
      await trx('product_partIds')
        .leftJoin('products', function () {
          this.on('product_partIds.productId', '=', 'products.productId').andOn(
            'product_partIds.supplier',
            '=',
            'products.supplier'
          )
        })
        .whereNull('products.productId')
        .del()

      // Delete entries from products table if productId no longer exists in product_partIds table
      await trx('products')
        .leftJoin('product_partIds', function () {
          this.on('products.productId', '=', 'product_partIds.productId').andOn(
            'products.supplier',
            '=',
            'product_partIds.supplier'
          )
        })
        .whereNull('product_partIds.productId')
        .del()
    })

    console.log('Data inserted or updated successfully and orphaned records deleted')
  } catch (error) {
    console.error('Error inserting or updating data:', error)
  } finally {
    await DB.destroy()
  }
}

insertOrUpdateData()
