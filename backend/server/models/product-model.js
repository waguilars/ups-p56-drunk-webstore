const mongoose = require('mongoose');
const paginator = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio.'],
    },
    desc_short: {
      type: String,
      required: [true, 'Por favor escriba una breve descripcion del producto.'],
    },
    desc_long: {
      type: String,
      required: [true, 'La descripcion es necesaria.'],
    },
    price: {
      type: Number,
      required: [true, 'El precio del producto es obligatorio.'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      required: [true, 'Seleccione una categoria.'],
    },
    img: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: [true, 'Ingrese el stock disponible.'],
    },
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  let product = this;
  let productObject = product.toObject();
  delete productObject.__v;
  return productObject;
};

productSchema.plugin(paginator);

module.exports = mongoose.model('Producto', productSchema);
