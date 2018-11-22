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
    addEntry: {
      type: EntryType,
      args: {
        title: { type: GraphQLString },
        date: { type: GraphQLString },
        location: { type: GraphQLString }
      },
      resolve(parentValue, { title, date, location }) {
        return (new Entry({ title, date, location })).save()
      }
    },
    deleteEntry: {
      type: EntryType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Entry.remove({ _id: id });
      }
    },
    editEntry: {
      type: EntryType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        date: { type: GraphQLString },
        location: { type: GraphQLString }        
      },
      resolve(parentValue, params) {
        return Entry.findByIdAndUpdate(
          params.id,
          { $set: { title: params.title, date: params.date, location: params.location } },
          { new: true }
        )
          .catch(err => new Error(err));
      }
    },
    addBirdToEntry: {
      type: EntryType,
      args: {
        name: { type: GraphQLString },
        entryId: { type: GraphQLID }
      },
      resolve(parentValue, { name, entryId }) {
        return Entry.addBird(entryId, name);
      }
    },
    likeBird: {
      type: BirdType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Bird.like(id);
      }
    },
    deleteBird: {
      type: BirdType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Bird.remove({ _id: id });
      }
    },
    editBird: {
      type: BirdType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }        
      },
      resolve(parentValue, params) {
        return Bird.findByIdAndUpdate(
          params.id,
          { $set: { name: params.name } },
          { new: true }
        )
          .catch(err => new Error(err));
      }
    },
  }
});

module.exports = mutation;
