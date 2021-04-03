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
    const { q, limit, page, fields, orderBy, sortBy=1 } = criteria

    const skip = (page > 1) ? (page - 1) * limit : 0

    const query = Game.find() // criteria irá informar o que será buscado no MongoDB

    if(q) { 
      const  regex = new RegExp(`.*${q}.*`, 'i') // faz busca ignorando case sensitive
      const searchQuery = { $or: [
        { title: regex },
        { otherTitle: regex },
        { publishers: regex },
        { developers: regex }
      ] }
      query.find(searchQuery)
    }
    if(limit) query.limit(limit) // aplica limite de resultados para paginação
    if(skip) query.skip(skip) // indica quantos itens serão pulados antes da exibição de resultados
    if(fields) query.select(fields.split(',')) // seleciona e exibe atributos específicos do array de resultado 
    if(orderBy) query.sort({ [orderBy]: sortBy }) // ordenação por atributo indicado pelo orderBy na direção indicada pelo sortBy

    return query.exec()
  },

  store: (data) => {
    const game = new Game(data)

    return game.save()
  }
}