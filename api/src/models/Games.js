const { Schema, model } = require('mongoose')

const GameSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  otherTitles: [String], // indica um array de strings
  developers: [String],
  publishers: [String],
  genres: [String],
  firstReleased: Date,
  japanRelease: Date,
  usaRelease: Date,
  euroRelease: Date
}, { collection: 'games', strict: false })

const Game = model('Game', GameSchema)

module.exports = {
  find: (criteria) => {
    const { limit } = criteria
    const query = Game.find(criteria) // criteria irá informar o que será buscado no MongoDB
    if(limit) query.limit(limit)
    return query.exec()
  }
}