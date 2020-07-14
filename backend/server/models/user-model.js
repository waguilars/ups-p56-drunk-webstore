const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol valido.',
};

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
  },
  lastname: {
    type: String,
    required: [true, 'El apellido es obligatorio.'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria.'],
  },
  img: {
    type: String,
    required: false,
    default: '',
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: validRoles,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico.' });

module.exports = mongoose.model('Usuario', userSchema);
