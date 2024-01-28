import { request, handleResponse } from './util'
import { privateProfile } from './profile'

export const getItems = async () => {
  const resp = await request('GET', '/items')
  return handleResponse({ resp, valid: ['goodItems'] })
}

export const getOwnItems = async () => {
  const { data, error } = await privateProfile()
  if (error) {
    return { error }
  }
  return {
    data: {
      equipped: data.equippedItems.map((item) => item.id),
      items: data.items
    }
  }
}

export const buyItem = async (id) => {
  const resp = await request('POST', `/items/${encodeURIComponent(id)}/buy`)

  return handleResponse({ resp, valid: ['goodPurchase'] })
}

export const equipItem = async (id) => {
  const resp = await request('PUT', `/items/${encodeURIComponent(id)}/equip`)

  return handleResponse({ resp, valid: ['goodEquip'] })
}
