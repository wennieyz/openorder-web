import fetchAllProductInfoFromDB from '../database/fetchDataFromDB.js'; // Adjust the path as needed
import { TProductCardProps } from '@/components/ProductCard';

let marketplaceDiscoverData: TProductCardProps[] = [];


const initializeMarketplaceData = async (page = 1, limit = 10): Promise<void> => {
  try {
    const products = await fetchAllProductInfoFromDB(page, limit);
    marketplaceDiscoverData = products;
    console.log('Initialized marketplaceDiscoverData:', JSON.stringify(marketplaceDiscoverData, null, 2));
  } catch (error) {
    console.error('Error initializing marketplace data:', error);
    marketplaceDiscoverData = []; // Fallback data can be assigned here if needed
  }
};


initializeMarketplaceData();

export { marketplaceDiscoverData };