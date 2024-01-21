import * as db from '../../database'
import { responses } from '../../responses'

export default {
  method: 'PUT',
  path: '/items/:id/equip',
  requireAuth: true,
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
  handler: async ({ req, user }) => {
    const res = await db.store.equipPurchase({ userid: user.id, itemid: req.params.id })
    if (res === undefined) {
      return responses.badEquip
    }
    return [responses.goodEquip, res]
  }
}
