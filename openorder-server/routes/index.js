var express = require('express');
var router = express.Router();
const request = require('request');
const axios = require('axios');

const Authorization =
  '808171EC-709C-46C6-9DF3-89E7B9D03525|CE2RQDK-MG8MYJ3-KCMB7PX-MWMYDB7';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: Authorization,
  },
};

// Create an array of supplier objects
const suppliers = [
  { value: 'GEM', name: 'Gemline' },
  { value: 'DIAMONDBACKBRANDING', name: 'Diamondback Branding' },
  { value: 'snugz', name: 'Snugz' },
  { value: 'PCNA', name: 'PCNA' },
  { value: 'HIT', name: 'HIT Promotional Products' },
  { value: 'belpromo', name: 'Belpromo' },
  { value: 'ETS', name: 'ETS Express' },
  { value: 'towelspecialties', name: 'Towel Specialties' },
  { value: 'terry', name: 'Terrytown' },
  { value: 'PEERLESSUMBRELLACO', name: 'Peerless Umbrella Co.' },
  { value: 'POPPROMOS', name: 'Pop! Promos' },
  { value: 'kooziegroup', name: 'Koozie Group (previously BIC Graphic)' },
  { value: 'Hirsch', name: 'Hirsch Gift' },
  { value: 'sign', name: 'Showdown Displays' },
  { value: 'orbus', name: 'Orbus' },
  { value: 'digispec', name: 'Digispec' },
  { value: 'Gold', name: 'Gold Bond World Wide' },
  { value: 'LMRK', name: 'Logomark' },
  { value: 'JOURNALBOOKSTIMEPLANNER', name: 'JOURNALBOOKSTIMEPLANNER' },
  { value: 'Ariel', name: 'Ariel Premium Supply' },
  { value: 'MAG', name: 'The Magnet Group' },
  { value: 'tekweld', name: 'Tekweld' },
  { value: 'CAP', name: 'Cap America' },
  { value: 'STOUSE', name: 'Stouse' },
  { value: 'RainingRose', name: 'Raining Rose' },
  { value: 'SS', name: 'S&S Activewear' },
  { value: 'SanMar', name: 'SanMar' },
  { value: 'alphabroder', name: 'Alphabroder' },
];

const apiBaseUrl = `https://api.dc-onesource.com/json/`;

const fetchProductDetails = async (supplierName, productId) => {
  const url = `${apiBaseUrl}${supplierName}/ps/product/getProduct/${productId}`;
  try {
    const productResponse = await axios.get(url, options);
    const productInfo = productResponse.data.data.Product;
    const maxSizeImage = await fetchMaxSizeImage(supplierName, productId);
    // use primary image url if no media content url
    const imageUrl = maxSizeImage
      ? maxSizeImage.url
      : productInfo.primaryImageUrl || null;

    if (!imageUrl || new Date(productInfo.effectiveDate) > new Date()) {
      return null; // Return null if there's no image or if the product is not available yet
    }

    return {
      id: productInfo.productId,
      imageUrl,
      availableDate: productInfo.effectiveDate || null,
    };
  } catch (error) {
    console.error(`Error fetching product details for ${productId}:`, error);
    return { id: productId, imageUrl: null };
  }
};

const fetchProductInfos = async (supplierName, productId) => {
  const url = `${apiBaseUrl}${supplierName}/ps/product/getProduct/${productId}`;
  try {
    const productResponse = await axios.get(url, options);
    return {
      id: productId,
      name: productResponse.data.data.Product.productName || null,
      description: productResponse.data.data.Product.description || null,
      brand: productResponse.data.data.Product.productBrand || null,
      related: productResponse.data.data.Product.RelatedProductArray || null,
      imageUrl: productResponse.data.data.Product.primaryImageUrl || null,
    };
  } catch (error) {
    console.error(`Error fetching product details for ${productId}:`, error);
    return {
      id: productId,
      name: null,
      description: null,
      brand: null,
      related: null,
      imageUrl: null,
    };
  }
};

const fetchEachSupplierSellableProducts = async (supplier, limit, offset) => {
  try {
    const sellableUrl = `${apiBaseUrl}${supplier.value}/ps/product/getProductSellable`;
    const response = await axios.get(sellableUrl, options);
    // console.log('line 105 : ' + response.data.data.ProductSellableArray);
    const products = response.data.data.ProductSellableArray;
    const uniqueProductIds = [
      ...new Set(products.map((product) => product.productId)),
    ].slice(offset, offset + limit);

    const productInfos = (
      await Promise.all(
        uniqueProductIds.map((productId) =>
          fetchProductDetails(supplier.value, productId)
        )
      )
    ).filter((product) => product !== null); // Filter out products with null images or future effective dates

    return {
      supplier: supplier.value,
      products: productInfos,
    };
  } catch (error) {
    console.error(`Error fetching data for supplier ${supplier.name}:`, error);
    return { supplier: supplier.value, products: [] };
  }
};

router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const productDataPromises = suppliers.map((supplier) =>
      fetchEachSupplierSellableProducts(supplier, limit, offset)
    );
    const allProducts = await Promise.all(productDataPromises);
    console.log(allProducts);
    res.render('index', {
      allProducts,
      currentPage: page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching product data:', error);
    next(error);
  }
});

async function fetchMediaContent(supplierCode, productId) {
  const mediaContentUrl = `${apiBaseUrl}${supplierCode}/ps/med/getMediaContent/${productId}`;
  const response = await fetch(mediaContentUrl, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch media content: ${response.statusText}`);
  }
  return response.json();
}

async function fetchMaxSizeImage(supplierCode, productId) {
  const mediaContentUrl = `${apiBaseUrl}${supplierCode}/ps/med/getMediaContent/${productId}`;
  const response = await axios.get(mediaContentUrl, options);
  // Inspect the response structure
  // console.log('Response Data:', response.data);

  // console.log('line 157 : ' + response.data.data.MediaContentArray);
  if (!response.data.data || !response.data.data.MediaContentArray) {
    return null;
  }

  const images = response.data.data.MediaContentArray.filter(
    (item) => item.mediaType === 'Image'
  );

  if (images.length === 0) {
    throw new Error('No valid images found');
  }

  const maxSizeImage = images.reduce((maxImage, currentImage) => {
    return currentImage.fileSize > maxImage.fileSize ? currentImage : maxImage;
  });
  // console.log(maxSizeImage);
  return maxSizeImage;
}

router.get('/product/:supplier/:productId', async (req, res, next) => {
  try {
    // console.log('line138' + req.params.productId);
    // console.log('line139' + req.params.supplier);
    const productId = req.params.productId;
    const supplierCode = req.params.supplier;
    // const thisProductInfoUrl = `${apiBaseUrl}${supplierCode}/ps/product/getProduct/${productId}`;
    // const mediaContentUrl =`${apiBaseUrl}${supplierCode}/ps/med/getMediaContent/${productId}`;
    // console.log(thisProductInfoUrl);
    const productInfo = await fetchProductInfos(supplierCode, productId);
    const mediaContentResponse = await fetchMediaContent(
      supplierCode,
      productId
    );
    const mediaContent = mediaContentResponse.data.MediaContentArray;

    console.log('Product Info:', productInfo);
    console.log('Media Content:', mediaContent);

    res.render('single-product', {
      productInfo,
      mediaContent,
    });
  } catch (error) {
    console.error('Error fetching product data:', error);
    next(error);
  }
});

module.exports = router;
