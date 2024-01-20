import { EventEmitter } from 'events'

import * as db from '../../../database'
import { Item, Purchase } from '../../../store/types'
import { Provider } from '../../../store/Provider'
import { applyItemDefaults } from '../../../store/util'

class DatabaseProvider extends EventEmitter implements Provider {
  private items: Item[] = []
  private purchases: Purchase[] = []

  constructor() {
    super()
    void this.update()
  }

  private async update(): Promise<void> {
    try {
      const dbchallenges = await db.store.getAllItems()

      this.items = dbchallenges

      this.emit('update', this.items)
    } catch (e) {
      // TODO: wrap error?
      this.emit('error', e)
    }
  }

  forceUpdate(): void {
    void this.update()
  }

  async updateItem(item: Item): Promise<void> {
    const originalData = await db.store.getItemById({
      id: item.id
    })

    // If we're inserting, have sane defaults
    if (originalData === undefined) {
      item = applyItemDefaults(item)
    } else {
      item = {
        ...originalData,
        ...item
      }
    }

    await db.store.upsertItem(item)

    void this.update()
  }

  async deleteItem(id: string): Promise<void> {
    await db.store.removeItemById({ id: id })

    void this.update()
  }

  cleanup(): void {
    // do nothing
  }
}

export default DatabaseProvider
