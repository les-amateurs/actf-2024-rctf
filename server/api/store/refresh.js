import { responses } from '../../responses'
import * as store from '../../store'

// security by not telling people this endpoint exists lol
export default {
  method: 'POST',
  path: '/refresh',
  requireAuth: false, // would I regret doing this? maybe? 
  handler: async () => {
    store.resetCache();
    return [responses.goodItems, {
      ok: true,
      message: "You successfully sent a request to refresh the items. Good job!"
    }]
  }
}
