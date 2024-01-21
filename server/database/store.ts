import db from './db'
import type { Item, Purchase } from '../store/types'
import { User } from './users'

export const getAllItems = (): Promise<Item[]> => {
  return db
    .query<Item>('SELECT * FROM items ORDER BY id ASC')
    .then((res) => res.rows)
}

export const getItemById = ({
  id
}: Pick<Item, 'id'>): Promise<Item | undefined> => {
  return db
    .query<Item>('SELECT * FROM items WHERE id = $1', [id])
    .then((res) => res.rows[0])
}

export const newItem = ({
  name,
  description,
  type,
  price
}: Pick<Item, 'name' | 'description' | 'type' | 'price'>): Promise<Item> => {
  return db
    .query<Item>(
      'INSERT INTO items (name, description, type, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, type, price]
    )
    .then((res) => res.rows[0])
}

export const getPurchasesByUserId = ({
  userid
}: Pick<Purchase, 'userid'>): Promise<Purchase[]> => {
  return db
    .query<Purchase>('SELECT * FROM purchases WHERE userid = $1', [userid])
    .then((res) => res.rows)
}

export const getEquippedItems = ({
  userid
}: Pick<Purchase, 'userid'>): Promise<Item[]> => {
  return db
    .query<Item>(
      'SELECT * FROM items WHERE id IN (SELECT itemid FROM purchases WHERE equipped = true AND userid = $1)',
      [userid]
    )
    .then((res) => res.rows)
}

export const getEquippedItemByType = ({
  type,
  userid
}: Pick<Purchase, 'userid' | 'type'>): Promise<Item> => {
  return db
    .query<Item>(
      'SELECT * FROM items WHERE id = (SELECT itemid FROM purchases WHERE equipped = true AND userid = $1 AND type = $2)',
      [userid, type]
    )
    .then((res) => res.rows[0])
}

export const equipPurchase = async ({
  itemid,
  userid
}: Pick<Purchase, 'type' | 'userid' | 'itemid'>): Promise<Purchase> => {
  // unequip all other items
  await db.query(
    'UPDATE purchases SET equipped = false WHERE userid = $1 AND type = (SELECT type FROM items WHERE id = $2) AND itemid != $2',
    [userid, itemid]
  )

  return db
    .query<Purchase>(
      'UPDATE purchases SET equipped = NOT equipped WHERE userid = $1 AND itemid = $2 RETURNING *',
      [userid, itemid]
    )
    .then((res) => res.rows[0])
}

export const removeItemById = ({
  id
}: Pick<Item, 'id'>): Promise<Item | undefined> => {
  return db
    .query<Item>('DELETE FROM items WHERE id = $1 RETURNING *', [id])
    .then((res) => res.rows[0])
}

export const upsertItem = async ({
  id,
  type,
  price,
  name,
  description,
  resourceUrl,
  resourceName
}: Item): Promise<void> => {
  await db.query(
    `INSERT INTO items VALUES($1, $2, $3, $4::item_type, $5, $6, $7)
      ON CONFLICT (id)
      DO UPDATE SET 
        name = $2,
        description = $3,
        type = $4,
        price = $5,
        "resourceUrl" = $6,
        "resourceName" = $7
    `,
    [id, name, description, type, price, resourceUrl, resourceName]
  )
}

export const addChips = (
  id: string,
  chips: number
): Promise<User | undefined> => {
  return db
    .query<User>('UPDATE users SET chips = chips + $1 WHERE id = $2', [
      chips,
      id
    ])
    .then((res) => res.rows[0])
}

export const buyItem = async (
  userid: string,
  item: Item
): Promise<Purchase> => {
  const purchase = await db
    .query<Purchase>(
      'INSERT INTO purchases (type, itemid, userid) VALUES ($1, $2, $3) RETURNING *',
      [item.type, item.id, userid]
    )
    .then((res) => res.rows[0])
  // is this, timing attack?
  await addChips(userid, -item.price)
  return purchase
}
