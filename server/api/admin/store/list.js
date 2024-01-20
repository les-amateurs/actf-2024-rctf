import { responses } from '../../../responses'
import * as store from '../../../store'

import perms from '../../../util/perms'

export default {
  method: 'GET',
  path: '/admin/items',
  requireAuth: true,
  perms: perms.challsRead,
  handler: async () => {
    const items = store.getAllItems()
    return [responses.goodItems, items]
  }
}
