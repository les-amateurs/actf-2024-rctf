import { responses } from '../../../responses'
import * as store from '../../../store'
import perms from '../../../util/perms'

export default {
  method: 'DELETE',
  path: '/admin/items/:id',
  requireAuth: true,
  perms: perms.challsWrite,
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
    const chall = await store.deleteItem(req.params.id)

    return [responses.goodItemDelete, chall]
  }
}
