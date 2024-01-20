import db from './db'
import type { Item, Purchase } from '../store/types'

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
    .query<Purchase[]>('SELECT * FROM purchases WHERE userid = $1', [userid])
    .then((res) => res.rows[0])
}

export const getEquippedItems = ({
  userid
}: Pick<Purchase, 'userid'>): Promise<Purchase[]> => {
  return db
    .query<Purchase[]>(
      'SELECT * FROM purchases WHERE userid = $1 AND equipped = 1',
      [userid]
    )
    .then((res) => res.rows[0])
}

export const equipPurchase = async ({
  type,
  itemid,
  userid
}: Pick<Purchase, 'type' | 'userid' | 'itemid'>): Promise<Purchase> => {
  // unequip all other items
  await db.query(
    'UPDATE purchases SET equipped = 0 WHERE userid = $1 AND type = $2',
    [userid, type]
  )

  return db
    .query<Purchase>(
      'UPDATE purchases SET equipped = 1 WHERE userid = $1 AND itemid = $2 AND type = $3 RETURNING *',
      [userid, itemid, type]
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
  console.log([id, type, price, name, description, resourceUrl, resourceName])
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
