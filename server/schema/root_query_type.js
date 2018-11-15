const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const EntryType = require('./entry_type');
const BirdType = require('./bird_type');
const Bird = mongoose.model('bird');
const Entry = mongoose.model('entry');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    entries: {
      type: new GraphQLList(EntryType),
      resolve() {
        return Entry.find({});
      }
    },
    entry: {
      type: EntryType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Entry.findById(id);
      }
    },
    bird: {
      type: BirdType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Bird.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
