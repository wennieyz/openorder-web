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

    // Randomly select 4 products
    // const products = getRandomSubset(response.data.data.ProductSellableArray, 4)

    // Select the first 4 products
    // const products = response.data.data.ProductSellableArray.slice(0, 5)

    // console.log(products)

    // // Group products by productId and collect all partIds
    // const productMap = products.reduce((map, product) => {
    //   if (!map[product.productId]) {
    //     map[product.productId] = []
    //   }
    //   map[product.productId].push(product.partId)
    //   return map
    // }, {})

    // Select the first 5 unique product IDs
    const uniqueProductIds = [
      ...new Set(response.data.data.ProductSellableArray.map(p => p.productId)),
    ]
    const selectedProductIds = uniqueProductIds.slice(0, 6)
    // const selectedProductIds = uniqueProductIds
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

    // Fetch media content for each part ID
    // const mediaContentPromises = productParts.map(part =>
    //   fetchMediaContent(supplierName, productId, part.partId)
    // )
    // const mediaContents = await Promise.all(mediaContentPromises)
    // console.log('line 204: ' + mediaContents)

    // Extract all colors from ProductPartArray
    // Extract all colors from ProductPartArray with their corresponding partId

    const partColorMap = productParts.map(part => ({
      partId: part.partId.toString(),
      colors: part.ColorArray
        ? part.ColorArray.map(color =>
            color.colorName.replace(/\s*\(.*?\)/g, '')
          ).join('; ')
        : null,
    }))
    // console.log('partIds: ' + partIds)
    // Filter partColorMap to only include specified partIds
    const filteredPartColorMap = partColorMap.filter(part =>
      partIds.includes(part.partId)
    )
    // Join part IDs with their colors
    const colorWithPartIds = filteredPartColorMap
      .map(part => `${part.partId}: ${part.colors}`)
      .join('; ')

    // Extract lead times from ProductPartArray

    // console.log('line 148: ' + JSON.stringify(productParts))
    // Extract lead times from ProductPartArray
    const leadTimeMap = productParts.map(part => ({
      partId: part.partId.toString(),
      leadTime: part.leadTime || null,
    }))
    // console.log('line153: ' + JSON.stringify(leadTimeMap))

    // console.log('line 155: leadTime' + JSON.stringify(leadTimeMap))
    const categoryWords = productResponse.data.data.Product.ProductCategoryArray
      ? productResponse.data.data.Product.ProductCategoryArray.flatMap(cat => {
          // Create an array with category and subCategory if it exists
          return cat.subCategory ? [cat.category, cat.subCategory] : [cat.category]
        }).join(', ')
      : null

    // const leadTime = productResponse.data.data.Product.ProductPartArray[0].leadTime

    // console.log(
    //   'line 158: quant' +
    //     productResponse.data.data.Product.ProductPartArray[0].ShippingPackageArray[0]
    //       .quantity
    // )
    // const quantity =
    //   productResponse.data.data.Product.ProductPartArray[0].ShippingPackageArray[0]
    //     .quantity

    const keyWordsString =
      productResponse.data.data.Product.ProductKeywordArray?.map(
        item => item.keyword
      ).join(', ') || null
    // console.log(keyWords)
    // console.log(categoryWords)
    // Combine part IDs with their image URLs
    // const partImages = mediaContents
    //   .filter(content => content.length > 0)
    //   .map(
    //     (content, index) => `${productParts[index].partId}: ${content.join(', ')}`
    //   )

    // const productResponse = await axios.get(url, options)
    // console.log('line 172   : ' + productResponse.data.data.Product.productName)
    // console.log(
    //   'line 174   :' + JSON.stringify(productResponse.data.data.Product.description)
    // )
    // Fetch media content for each product and part ID
    // const mediaContent = await fetchMediaContent(
    //   supplierName,
    //   productId,
    //   partId,
    //   Authorization
    // )

    // use fob array[0] to store the price data: need to work on this
    //const fobPoint = productResponse.data.data.Product.FobPointArray[0].fobid;

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
  // console.log('line 230 ' + mediaContentResponse)

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
  // console.log('Response JSON:', fobPointResponse)
  // Extract fobIds from the response
  const fobIds = fobPointResponse.data.FobPointArray.map(item => item.fobId)

  // console.log('line 267, fobIds:', fobIds)
  // Example:
  // All FOB IDs with their price and config: {"100014-001":{"1":[{"minQuantity":100,"price":4.85},{"minQuantity":300,"price":4.58},
  //{"minQuantity":600,"price":4.36},{"minQuantity":1000,"price":4.19}]},
  //"100014-026":{"1":[{"minQuantity":100,"price":4.85},{"minQuantity":300,"price":4.58},{"minQuantity":600,"price":4.36},{"minQuantity":1000,"price":4.19}]},
  //"100014-080":{"1":[{"minQuantity":100,"price":4.85},{"minQuantity":300,"price":4.58},{"minQuantity":600,"price":4.36},{"minQuantity":1000,"price":4.19}]},
  //"100014-090":{"1":[{"minQuantity":100,"price":3.95}]},
  //"100014-412":{"1":[{"minQuantity":100,"price":4.85},{"minQuantity":300,"price":4.58},{"minQuantity":600,"price":4.36},{"minQuantity":1000,"price":4.19}]},
  ///"100014-461":{"1":[{"minQuantity":100,"price":2.37}]}}

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

getAllProductData()
// getConfigurationAndPricing('GEM', '100014')

export default {
  getAllProductData,
  fetchMediaContent,
  fetchProductInfos,
  getConfigurationAndPricing,
}
