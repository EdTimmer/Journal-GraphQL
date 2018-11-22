const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const BirdType = require('./bird_type');
const Entry = mongoose.model('entry');

const EntryType = new GraphQLObjectType({
  name:  'EntryType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    birds: {
      type: new GraphQLList(BirdType),
      resolve(parentValue) {
        return Entry.findBirds(parentValue.id);
      }
    }
  })
});

module.exports = EntryType;
