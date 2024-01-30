import { useCallback, useState, useEffect, useMemo } from 'preact/hooks'

import config from '../config'
import withStyles from '../components/jss'
import Problem from '../components/problem'
import NotStarted from '../components/not-started'
import { useToast } from '../components/toast'
import { getItems, getOwnItems } from '../api/items'
import Item from '../components/item'

const Items = ({ classes }) => {
  const [items, setItems] = useState([])
  /// ~~=== THIS CODE DOES NOT WORK, AND I HAVE NO FUCKING IDEA WHY, THIS IS WHAT YEARS OF JAVASCRIPT INNOVATION HAS LEAD US TO AND YET IT IS STILL IMPOSSIBLE TO DEBUG WHAT IS WRONG WITH THIS CODE AND ALSO IT MAKES NO FUCKING SENSE WHY THIS CODE SHOULDN'T WORK BUT I DIGRESS ===~~
  // it has been fixed but i still stand by my statement above
  const itemsMap = useMemo(() => {
    let newItems = {}
    for (const item of items) {
      newItems[item.id] = item
    }

    return newItems
  }, [items])
  const [ownedItems, setOwnedItems] = useState({ items: [], equipped: [] })
  const { toast } = useToast()

  useEffect(() => {
    document.title = `Items | ${config.ctfName}`
  }, [])

  useEffect(() => {
    const action = async () => {
      if (items.length !== 0) {
        return
      }
      const { data, error } = await getItems()
      if (error) {
        toast({ body: error, type: 'error' })
        return
      }

      setItems(data)
    }
    action()
  }, [toast])

  useEffect(() => {
    const action = async () => {
      const { data, error } = await getOwnItems()
      if (error) {
        toast({ body: error, type: 'error' })
        return
      }

      setOwnedItems(data)
    }
    action()
  }, [toast])

  const setItemStatus = useCallback(
    (id, status) => {
      switch (status) {
        case 'BUY':
          {
            setOwnedItems({ ...ownedItems, items: [...ownedItems.items, id] })
          }
          break
        case 'EQUIP':
          {
            const itemType = itemsMap[id].type
            setOwnedItems({
              ...ownedItems,
              equipped: [
                ...ownedItems.equipped.filter((item) => item.type !== itemType),
                id
              ]
            })
          }
          break
        case 'UNEQUIP':
          {
            setOwnedItems({
              ...ownedItems,
              equipped: [
                ...ownedItems.equipped.filter((item) => item !== id)
              ]
            })
          }
          break
      }
    },
    [itemsMap, ownedItems]
  )

  return (
    <div class={`row ${classes.row}`}>
      <div class="col-3">
        <div class={`frame ${classes.frame}`}>
          <div class="frame__body">
            <div class="frame__title title">Filters</div>
          </div>
        </div>
        <div class={`frame ${classes.frame}`}>
          <div class="frame__body">
            <div class="frame__title title">Equipped</div>
            <ul class={`${classes.equipped}`}>
              {ownedItems.equipped.map((i) => (
                <li key={itemsMap[i].type}>
                  <b>{itemsMap[i].type}: </b>
                  {itemsMap[i].name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div class="col-6">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            owned={ownedItems.items.includes(item.id)}
            equipped={ownedItems.equipped.includes(item.id)}
            setItemStatus={setItemStatus}
          />
        ))}
      </div>
    </div>
  )
}

export default withStyles(
  {
    showSolved: {
      marginBottom: '0.625em'
    },
    frame: {
      marginBottom: '1em',
      paddingBottom: '0.625em',
      background: '#222'
    },
    row: {
      justifyContent: 'center',
      '& .title, & .frame__subtitle': {
        color: '#fff'
      }
    },
    equipped: {
        listStyleType: 'none'
    }
  },
  Items
)
