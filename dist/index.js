
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./swapbscsdk.cjs.production.min.js')
} else {
  module.exports = require('./swapbscsdk.cjs.development.js')
}
