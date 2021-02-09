import serverless from 'serverless-http'

const server = require('./server')

const handler = serverless(server)

export { handler }
