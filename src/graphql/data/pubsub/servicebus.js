const { ServiceBusClient } = require('@azure/service-bus')
const { env: { SB_QUEUE_CONN_STRING } } = process
console.log(`SB_QUEUE_CONN_STRING ${SB_QUEUE_CONN_STRING}`)
const client = new ServiceBusClient(SB_QUEUE_CONN_STRING)

module.exports = client
