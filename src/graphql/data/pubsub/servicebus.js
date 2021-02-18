const { ServiceBusClient } = require('@azure/service-bus')
const { env: { SB_TOPIC_CONN_STRING } } = process
const client = new ServiceBusClient(SB_TOPIC_CONN_STRING)

module.exports = client
