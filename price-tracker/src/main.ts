import { fetchData } from "./fetchData.js";
import { handleData } from "./handleData.js";

console.log('Fetching price data for NL between 2026-01-26 and 2026-01-26...\n');

fetchData('/price?bzn=NL&start=2026-01-26&end=2026-01-26').then(
  (data) => handleData(data)
).catch(
  (error) => console.error('Error handling data:', error)
).finally(
  () => {
      console.log('\nDisclaimer: it only calculates the average price for each time slot across all days, so it may not reflect the actual price at that time in the future.');
  }
);
