import * as db from '../../database'
import { responses } from '../../responses'

export default {
  method: 'POST',
  path: '/items/:id/buy',
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
    const item = await db.store.getItemById({ id: req.params.id })
    const userObj = await db.users.getUserById({ id: user.id })
    if (userObj.chips >= item.price) {
      try {
        return [
          responses.goodPurchase,
          await db.store.buyItem(userObj.id, item)
        ]
      } catch (e) {
        if (e.constraint === 'already_owned') {
          return responses.badItemAlreadyOwned
        }

        throw e
      }
    }

    return responses.badPurchase
  }
}
