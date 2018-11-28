const mongoose = require('mongoose');
const db =
  'mongodb://webapi_assignment:aventador700@ds211724.mlab.com:11724/webapi_assignment';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  character_id: { type: Number },
  name: { type: String },
  gender: { type: String },
  culture: { type: String },
  born: { type: String },

  aliases: { type: String },
  father: { type: String },
  mother: { type: String },
  spouse: { type: String },
  character_image: { type: String }
});

const Character = mongoose.model('Character', schema, 'character_webapi');

module.exports = Character;
