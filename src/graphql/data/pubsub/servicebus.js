const { ServiceBusClient } = require('@azure/service-bus')
const { env: { SB_QUEUE_CONN_STRING } } = process
const client = new ServiceBusClient(SB_QUEUE_CONN_STRING)

module.exports = client
