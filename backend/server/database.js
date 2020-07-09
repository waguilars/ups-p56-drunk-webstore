const mongoose = require('mongoose');

const URI = 'mongodb://localhost/data-licores';


mongoose.connect(URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('DB is connexted'))
    .catch(err => console.error(err))

module.exports = mongoose;