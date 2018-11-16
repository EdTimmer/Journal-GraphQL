import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchEntry from '../queries/fetchEntry';
import BirdCreate from './BirdCreate';
import BirdList from './BirdList';

class EntryDetail extends Component {
  
  render() {
    const { entry } = this.props.data 
    if (!entry) {
      return (
        <div>Loading...</div>
      );
    }
    else {
      return (
        <div>
          <Link to="/">Back</Link>
          <h3>{entry.title}</h3>
          <BirdList birds={entry.birds} />
          <BirdCreate entryId={this.props.params.id} />
        </div>
      )
    }
  }
}

export default graphql(fetchEntry, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(EntryDetail);
