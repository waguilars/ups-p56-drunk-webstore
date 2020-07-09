const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Escriba el nombre de la categoria'],
  },
});

module.exports = mongoose.model('Categoria', categorySchema);
