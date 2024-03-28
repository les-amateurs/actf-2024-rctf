exports.up = (pgm) => {
  pgm.createType('item_type', ['font', 'background', 'line_style', 'misc'])
  pgm.createTable('items', {
    id: { type: 'string', primaryKey: true },
    name: { type: 'string', notNull: true },
    description: { type: 'string', notNull: true },
    type: { type: 'item_type', notNull: true },
    price: { type: 'int', notNull: true },
    resourceUrl: { type: 'string' },
    resourceName: { type: 'string' }
  })

  pgm.createTable('purchases', {
    id: { type: 'uuid', primaryKey: true, default: 'gen_random_uuid()' },
    type: { type: 'item_type', notNull: true },
    itemid: {
      type: 'string',
      notNull: true,
      references: 'items(id)',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    userid: {
      type: 'string',
      notNull: true,
      references: 'users(id)',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    equipped: { type: 'boolean', default: false, notNull: true }
  })

  pgm.addConstraint('purchases', 'already_owned', {
    unique: ['itemid', 'userid']
  })
}

exports.down = (pgm) => {
  pgm.dropConstraint('purchases', 'already_owned')
  pgm.dropTable('purchases')
  pgm.dropTable('items')
  pgm.dropType('item_type')
}
