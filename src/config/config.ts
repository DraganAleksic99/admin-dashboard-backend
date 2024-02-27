const { PORT, NODE_ENV, MONGODB_URI, MONGODB_NAME } = process.env

const FULL_MONGODB_URI = `${MONGODB_URI}${MONGODB_NAME}?retryWrites=true&w=majority`

const config = {
  port: PORT,
  nodeEnv: NODE_ENV,
  mongodbUri: FULL_MONGODB_URI
}

export default config
