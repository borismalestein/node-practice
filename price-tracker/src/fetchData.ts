import { PriceData } from "./config/types.js";
import { useFetch } from "./utils/useFetch.js";

export const fetchData = async (endpoint: string): Promise<PriceData> => {
  try {
    const response = await useFetch('GET', endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as PriceData;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
