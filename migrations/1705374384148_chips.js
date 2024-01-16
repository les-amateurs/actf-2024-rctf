/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.alterColumn('users', {
    chips: { type: 'int', default: 0 }
  })
}

exports.down = (pgm) => {
  pgm.dropColumns('users', 'chips')
}
