const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  birds: [{
    type: Schema.Types.ObjectId,
    ref: 'bird'
  }]
}, {
  usePushEach: true
});

EntrySchema.statics.addBird = function(id, content) {
  const Bird = mongoose.model('bird');

  return this.findById(id)
    .then(entry => {
      const bird = new Bird({ content, entry })
      entry.birds.push(bird)
      return Promise.all([bird.save(), entry.save()])
        .then(([bird, entry]) => entry);
    });
}

EntrySchema.statics.findBirds = function(id) {
  return this.findById(id)
    .populate('birds')
    .then(entry => entry.birds);
}

mongoose.model('entry', EntrySchema);
