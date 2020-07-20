const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Escriba el nombre de la categoria'],
  },
});

categorySchema.methods.toJSON = function () {
  let category = this;
  let categoryObject = category.toObject();
  delete categoryObject.__v;
  return categoryObject;
};

module.exports = mongoose.model('Categoria', categorySchema);
