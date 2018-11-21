const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Bird = mongoose.model('bird');

const BirdType = new GraphQLObjectType({
  name:  'BirdType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    name: { type: GraphQLString },
    entry: {
      type: require('./entry_type'),
      resolve(parentValue) {
        return Bird.findById(parentValue).populate('entry')
          .then(bird => {
            // console.log(bird)
            return bird.entry
          });
      }
    }
  })
});

module.exports = BirdType;
