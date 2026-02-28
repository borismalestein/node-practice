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
