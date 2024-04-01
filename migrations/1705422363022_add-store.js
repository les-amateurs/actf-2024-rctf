exports.up = (pgm) => {
  pgm.createExtension("uuid-ossp", {ifNotExists: true}) // required for uuid_generate_v4
  pgm.createExtension("pgcrypto", {ifNotExists: true}) // required for gen_random_uuid
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
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
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
  pgm.dropExtension("uuid-ossp")
  // TODO: should I drop pgcrypto? I kind of feel like we don't want to in case of conflicts with other stuff mb?
}
