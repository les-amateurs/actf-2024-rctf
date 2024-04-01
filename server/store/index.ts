import config from '../config/server'
import path from 'path'
import { Item, Purchase } from './types'
import { Provider, ProviderConstructor } from './Provider'
import { challUpdateEmitter, publishChallUpdate } from '../cache/challs'
import { EventEmitter } from 'events'

let provider: Provider

let items: Item[] = []

let itemsMap = new Map<string, Item>()

const onUpdate = (newItems: Item[]): void => {
  items = newItems
  itemsMap = new Map(newItems.map((c) => [c.id, c]))
}

void import(path.join('../providers', config.storeProvider.name))
  .then(({ default: Provider }: { default: ProviderConstructor }): void => {
    provider = new Provider(config.storeProvider.options ?? {})

    provider.on('update', onUpdate)
  })

// FIXME: remove cast once cache is typed
;(challUpdateEmitter as EventEmitter).on('update', () => {
  provider.forceUpdate()
})

export function getAllItems (): Item[] {
  return items
}

export function getItem (id: string): Item | undefined {
  return itemsMap.get(id)
}

export function resetCache (): void {
  provider.forceUpdate()
}

export async function updateItem (item: Item): Promise<void> {
  await provider.updateItem(item)
  // await publishChallUpdate()
}

export async function deleteItem (id: string): Promise<void> {
  await provider.deleteItem(id)
  // await publishChallUpdate()
}

export function setupPeriodicItemCacheCleanTask(){
  console.log("Starting periodic store refresh task...");
  setInterval(async function () {
    resetCache();
  }, 60 * 1000);
}
