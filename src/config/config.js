// List of required environment variables in local .env file
const environmentVariables = [
  'REDIS_HOST',
  'REDIS_PORT',
  'REDIS_PASSWORD',
  'SB_QUEUE_CONN_STRING'
]

// check that all environment variables are specified
environmentVariables.forEach(environmentVariable => {
  if (!process.env[environmentVariable]) {
    throw new Error(`Required environment variable ${environmentVariable} is missing.`)
  }
})

// generate config obj with all environment variables
const config = {
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    PASSWORD: process.env.PASSWORD
  },
  SERICE_BUS: {
    CONN_STRING: process.env.SB_QUEUE_CONN_STRING
  }
}

module.exports = config
