process.env.NODE_ENV = process.env.NODE_ENV || 'test'

const environment = require('./environment')
const config = environment.toWebpackConfig()

module.exports = config
