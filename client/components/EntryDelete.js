import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchEntries';

class EntryDelete extends Component {
  constructor(props) {
    super(props);
    this.onEntryDelete = this.onEntryDelete.bind(this);
  }
   
  onEntryDelete() {
    this.props.mutate({ variables: { id: this.props.id } })    
    .then(() => this.props.data.refetch())
    .then(() => hashHistory.push('/'))
  }

  render() {
    return (
      <div>
        <button className="btn red" onClick={this.onEntryDelete}>Delete Entire Entry</button>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteEntry($id: ID) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

export default graphql(mutation) (
  graphql(query)(EntryDelete)
)
