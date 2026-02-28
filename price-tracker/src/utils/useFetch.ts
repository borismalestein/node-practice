import { energyChartsApiUrl } from "../config/constants.js"

export const useFetch = async (
  method: string,
  endpoint: string,
  body?: string,
  additionalHeaders: object = {}
): Promise<Response> => {
  const headers = new Headers()

  headers.append('Content-Type', 'application/json')

  if (Object.keys(additionalHeaders).length) {
    for (const [key, value] of Object.entries(additionalHeaders)) {
      headers.append(key, value)
    }
  }

  const options = {
    method,
    headers,
  }

  if (body) {
    Object.assign(options, { body })
  }

  const apiUrlWithEndpoint = energyChartsApiUrl + endpoint

  return await fetch(apiUrlWithEndpoint, options)
}
