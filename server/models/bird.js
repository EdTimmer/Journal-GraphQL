const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BirdSchema = new Schema({
  entry: {
    type: Schema.Types.ObjectId,
    ref: 'entry'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

BirdSchema.statics.like = function(id) {
  const Bird = mongoose.model('bird');

  return Bird.findById(id)
    .then(bird => {
      ++bird.likes;
      return bird.save();
    })
}

mongoose.model('bird', BirdSchema);
