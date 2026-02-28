export interface PriceParams {
  bzn: string // bidding zone
  start: string // ISO date string
  end: string // ISO date string
}

export interface PriceData {
  license_info: string,
  unix_seconds: number[] | null,
  price: number[] | null,
  unit: string,
  deprecated: boolean
}

export type TimePriceMap = Map<string, { total: number, count: number }>
export type MinMaxAverage = { time: string, average: number }