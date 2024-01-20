import { deepCopy } from '../util'
import { Item } from './types'

const ItemDefaults: Item = {
  id: 0,
  name: '',
  description: '',
  price: 100,
  resourceUrl: '',
  type: 'font',
  resourceName: ''
}
export const applyItemDefaults = (item: Item): Item => {
  const copy = deepCopy(ItemDefaults)

  return {
    ...copy,
    ...item
  }
}
