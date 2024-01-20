import { responses } from '../../../responses'
import * as store from '../../../store'
import perms from '../../../util/perms'

export default {
  method: 'GET',
  path: '/admin/items/:id',
  requireAuth: true,
  perms: perms.challsRead,
  schema: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        }
      },
      required: ['id']
    }
  },
  handler: async ({ req }) => {
    const item = store.getItem(req.params.id)

    if (!item) {
      return responses.badItem
    }

    return [responses.goodItems, item]
  }
}
