import { MinMaxAverage, PriceData, TimePriceMap } from "./config/types.js";

export const handleData = (data: PriceData): void => {
    if (data.deprecated) {
        console.warn('The data is deprecated. License info:', data.license_info);
        return
    }

    if (data.unix_seconds && data.price) {
        const priceData = getMinMaxAverages(data);

        console.log(`Lowest average price at ${priceData.lowest.time} with an average of ${priceData.lowest.average.toFixed(2)} ${data.unit}`);
        console.log(`Highest average price at ${priceData.highest.time} with an average of ${priceData.highest.average.toFixed(2)} ${data.unit}`);
    } else {
        console.warn('No valid price data available.');
    }
}

const getMinMaxAverages = (data: PriceData): { lowest: MinMaxAverage, highest: MinMaxAverage } => {
    if (data.unix_seconds.length === 0 || data.unix_seconds.length !== data.price.length) {
        throw new Error("Arrays must be non-empty and of the same length.");
    }

    const timeMap: TimePriceMap = new Map()

    data.unix_seconds.forEach((timestamp, index) => {
        const date = new Date(timestamp  * 1000) // seconds to milliseconds
        const hour = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        const timeKey = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const price = data.price[index]

        if (!timeMap.has(timeKey)) {
            timeMap.set(timeKey, { total: 0, count: 0 });
        }

        const timestampPrice = timeMap.get(timeKey)
        timestampPrice.total += price
        timestampPrice.count += 1
    })

    const lowest: MinMaxAverage = { time: '', average: 0 }
    const highest: MinMaxAverage = { time: '', average: 0 }

    timeMap.forEach((timeValues, timeKey) => {
        const averagePrice = timeValues.total / timeValues.count

        if (!lowest.time || averagePrice < lowest.average) {
            lowest.time = timeKey
            lowest.average = averagePrice
        }

        if (!highest.time || averagePrice > highest.average) {
            highest.time = timeKey
            highest.average = averagePrice
        }
    })

    return { lowest, highest}
}
