import { responses } from '../../../responses'
import * as store from '../../../store'

import perms from '../../../util/perms'

export default {
  method: 'PUT',
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
    },
    body: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            type: {
              type: 'string'
            },
            price: {
              type: 'integer'
            },
            resourceUrl: {
              type: 'string'
            },
            resourceName: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  handler: async ({ req }) => {
    const item = req.body.data

    // Ensure id is consistent
    item.id = req.params.id

    await store.updateItem(item)

    return [responses.goodItemUpdate, item]
  }
}
