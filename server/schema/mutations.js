const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Entry = mongoose.model('entry');
const Bird = mongoose.model('bird');
const EntryType = require('./entry_type');
const BirdType = require('./bird_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: EntryType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Entry({ title })).save()
      }
    },
    addBirdToEntry: {
      type: EntryType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parentValue, { content, entryId }) {
        return Entry.addBird(entryId, content);
      }
    },
    likeBird: {
      type: BirdType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Bird.like(id);
      }
    },
    deleteEntry: {
      type: EntryType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Entry.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
