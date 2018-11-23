const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BirdSchema = new Schema({
  entry: {
    type: Schema.Types.ObjectId,
    ref: 'entry'
  },
  name: { type: String }
});

mongoose.model('bird', BirdSchema);
