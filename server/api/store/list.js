import { responses } from '../../responses'
import * as store from '../../store'

export default {
  method: 'GET',
  path: '/items',
  requireAuth: true,
  handler: async () => {
    const items = store.getAllItems()
    return [responses.goodItems, items]
  }
}
