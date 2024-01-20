export type ItemType = 'font' | 'background' | 'line_style' | 'misc'

export interface Item {
  id: string
  name: string
  description: string
  type: ItemType
  price: number
  resourceUrl: string
  resourceName: string
}

export interface Purchase {
  id: string
  type: ItemType
  itemid: string
  userid: string
  equipped: boolean
}
