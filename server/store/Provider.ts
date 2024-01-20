import { EventEmitter } from 'events'
import { Item } from './types'

export interface Provider extends EventEmitter {
  forceUpdate(): void
  /*
    If the item doesn't exist already, create it.
    Otherwise, update the item data.

    Item equality is determined by chall.id.
  */
  updateItem(item: Item): Promise<void>
  deleteItem(id: string): Promise<void>
  cleanup(): void
}

export interface ProviderConstructor {
  new (options: unknown): Provider
}
