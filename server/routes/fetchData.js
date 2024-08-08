import axios from 'axios'
import dotenv from 'dotenv'
import suppliers from '../constants/suppliers.js'

dotenv.config()

const Authorization = process.env.ONESOURCE_API_KEY

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: Authorization,
  },
}

const apiBaseUrl = `https://api.dc-onesource.com/json/`

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn()
  } catch (err) {
    if (retries === 0) throw err
    await sleep(delay)
    return retryWithBackoff(fn, retries - 1, delay * 2)
  }
}

const fetchEachSupplierSellableProducts = async supplier => {
  try {
    const sellableUrl = `${apiBaseUrl}${supplier.value}/ps/product/getProductSellable`
    const response = await retryWithBackoff(() => axios.get(sellableUrl, options))

    if (!response.data || !response.data.data) {
      console.error(`No data found for supplier ${supplier.name}`)
      console.error(`Response data: ${JSON.stringify(response.data)}`)
      return {supplier: supplier.value, supplierName: supplier.name, products: []}
    }

    if (!response.data.data.ProductSellableArray) {
      console.error(`No ProductSellableArray found for supplier ${supplier.name}`)
      console.error(`Response data: ${JSON.stringify(response.data)}`)
      return {supplier: supplier.value, supplierName: supplier.name, products: []}
    }

    // Select the first 5 unique product IDs
    const uniqueProductIds = [
      ...new Set(response.data.data.ProductSellableArray.map(p => p.productId)),
    ]
    // const selectedProductIds = uniqueProductIds.slice(0, 6)
    const selectedProductIds = uniqueProductIds
    const productMap = selectedProductIds.reduce((map, productId) => {
      map[productId] = response.data.data.ProductSellableArray.filter(
        product => product.productId === productId
      ).map(product => product.partId)
      return map
    }, {})

    const productInfos = await Promise.all(
      Object.entries(productMap).map(([productId, partIds]) =>
        fetchProductInfos(supplier.value, productId, partIds)
      )
    )

    return {
      supplier: supplier.value,
      products: productInfos,
    }
  } catch (error) {
    console.error(`Error fetching data for supplier ${supplier.name}:`, error)
    return {supplier: supplier.value, products: []}
  }
}

const fetchProductInfos = async (supplierName, productId, partIds) => {
  const url = `${apiBaseUrl}${supplierName}/ps/product/getProduct/${productId}`
  try {
    const productResponse = await retryWithBackoff(() => axios.get(url, options))
    const productParts = productResponse.data.data.Product.ProductPartArray || []

    // Function to switch URL from SMALL to LARGE for supplier PCNA
    const switchToLargeIfExists = async url => {
      if (supplierName === 'PCNA' && url.includes('SMALL')) {
        const largeUrl = url.replace('SMALL', 'LARGE')
        try {
          const response = await axios.head(largeUrl) // Check if LARGE URL exists
          if (response.status === 200) {
            return largeUrl
          }
        } catch (error) {
          console.warn(`LARGE image not found for URL: ${largeUrl}`)
        }
      }
      return url
    }

    // Extract primary image URL and switch it if necessary
    let primaryImageUrl = productResponse.data.data.Product.primaryImageUrl || null
    primaryImageUrl = await switchToLargeIfExists(primaryImageUrl)

    const partColorMap = productParts.map(part => ({
      partId: part.partId.toString(),
      colors: part.ColorArray
        ? part.ColorArray.map(color =>
            color.colorName.replace(/\s*\(.*?\)/g, '')
          ).join('; ')
        : null,
    }))

    // Filter partColorMap to only include specified partIds
    const filteredPartColorMap = partColorMap.filter(part =>
      partIds.includes(part.partId)
    )
    // Join part IDs with their colors
    const colorWithPartIds = filteredPartColorMap
      .map(part => `${part.partId}: ${part.colors}`)
      .join('; ')
    // Extract lead times from ProductPartArray
    const leadTimeMap = productParts.map(part => ({
      partId: part.partId.toString(),
      leadTime: part.leadTime || null,
    }))

    const categoryWords = productResponse.data.data.Product.ProductCategoryArray
      ? productResponse.data.data.Product.ProductCategoryArray.flatMap(cat => {
          // Create an array with category and subCategory if it exists
          return cat.subCategory ? [cat.category, cat.subCategory] : [cat.category]
        }).join(', ')
      : null

    const keyWordsString =
      productResponse.data.data.Product.ProductKeywordArray?.map(
        item => item.keyword
      ).join(', ') || null

    return {
      productId: productId,
      partIds: partIds,
      name: productResponse.data.data.Product.productName || null,
      description: Array.isArray(productResponse.data.data.Product.description)
        ? productResponse.data.data.Product.description.join('; ')
        : productResponse.data.data.Product.description || null,

      brand: productResponse.data.data.Product.productBrand || null,
      category: categoryWords,
      color: colorWithPartIds,
      keyword: keyWordsString,
      imageUrl: primaryImageUrl,
      effectiveDate: productResponse.data.data.Product.effectiveDate || null,
      leadTimes: leadTimeMap || null,
    }
  } catch (error) {
    console.error(`Error fetching product details for ${productId}:`, error)
    return {
      productId: productId,
      partIds: partIds,
      name: null,
      description: null,
      brand: null,
      category: null,
      color: null,
      keyword: null,
      imageUrl: null,
      effectiveDate: null,
      leadTime: null,
    }
  }
}

async function getAllProductData() {
  try {
    const productDataPromises = suppliers.map(supplier =>
      fetchEachSupplierSellableProducts(supplier)
    )
    const allProducts = await Promise.all(productDataPromises)
    // console.log(allProducts)
    return allProducts
  } catch (error) {
    console.error('Error fetching product data:', error)
    return []
  }
}

async function fetchMediaContent(supplierCode, productId) {
  const mediaContentUrl = `${apiBaseUrl}${supplierCode}/ps/med/getMediaContent/${productId}`
  const response = await fetch(mediaContentUrl, options)
  if (!response.ok) {
    throw new Error(`Failed to fetch media content: ${response.statusText}`)
  }
  const mediaContentResponse = response.json()

  return mediaContentResponse
}

// get fob points:
async function fetchFobPoints(supplierCode, productId) {
  const fobPointUrl = `${apiBaseUrl}${supplierCode}/ps/ppc/getFobPoints/${productId}`
  const response = await fetch(fobPointUrl, options)
  if (!response.ok) {
    throw new Error(`Failed to fetch fob point: ${response.statusText}`)
  }
  // Parse JSON response
  const fobPointResponse = await response.json()
  if (
    !fobPointResponse.data ||
    !Array.isArray(fobPointResponse.data.FobPointArray)
  ) {
    throw new Error('FobPointArray is missing or not an array' + supplierCode)
  }

  // Extract fobIds from the response
  const fobIds = fobPointResponse.data.FobPointArray.map(item => item.fobId)

  return fobIds
}

// get price/minimum quantity
async function getConfigurationAndPricing(supplierCode, productId) {
  try {
    const fobPoints = await fetchFobPoints(supplierCode, productId)
    const results = {}

    for (const fobId of fobPoints) {
      const configAndPriceUrl = `${apiBaseUrl}${supplierCode}/ps/ppc/getConfigurationAndPricing/${productId}?fobId=${fobId}`

      try {
        const response = await axios.get(configAndPriceUrl, options)
        const {data} = response.data

        if (
          data &&
          data.Configuration &&
          data.Configuration.PartArray &&
          data.Configuration.PartArray.length > 0
        ) {
          data.Configuration.PartArray.forEach(part => {
            if (!results[part.partId]) {
              results[part.partId] = {}
            }
            if (!results[part.partId][fobId]) {
              results[part.partId][fobId] = []
            }
            const pricing = part.PartPriceArray.map(price => ({
              minQuantity: price.minQuantity,
              price: price.price,
            }))
            results[part.partId][fobId] = pricing
          })
        } else {
          results[fobId] = {
            error: 'Invalid response structure or no parts found',
          }
        }
      } catch (error) {
        console.error(`Failed to fetch price and config for FOB ID ${fobId}:`, error)
        results[fobId] = {error: error.message}
      }
    }

    // console.log('All FOB IDs with their price and config:', JSON.stringify(results))
    return results
  } catch (error) {
    console.error(`Error in fetching FOB points:`, error)
    return {}
  }
}

// getAllProductData()
// getConfigurationAndPricing('GEM', '100014')

export default {
  getAllProductData,
  fetchMediaContent,
  fetchProductInfos,
  getConfigurationAndPricing,
}
