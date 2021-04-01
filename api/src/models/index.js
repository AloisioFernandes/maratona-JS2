const { connect } = require('mongoose')
const MONGODB_URL = process.env.DATABASE

module.exports = () => {
  const options = { // opções do MongoDB
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
  return connect(MONGODB_URL, options)
}