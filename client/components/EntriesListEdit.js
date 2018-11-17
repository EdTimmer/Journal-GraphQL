import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchEntries';

class EntriesListEdit extends Component {
  onEntryDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderEntries() {
    return this.props.data.entries.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/entries/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.onEntryDelete(id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div>Loading...</div>
      );
    }
    // else {
      return (
        <div>
          <Link to="/">Home</Link>
          <div>
            <h3>Edit Journal Entries</h3>
          </div>
          <ul className="collection">
            {this.renderEntries()}
          </ul>
          <Link 
            to="/entries/new"
            className="btn-floating btn-large red right"     
          >
            <i className="material-icons">add</i>
          </Link>        
        </div>
        
      )
    // }    
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
  graphql(query)(EntriesListEdit)
)

