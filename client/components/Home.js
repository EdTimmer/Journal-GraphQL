import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchEntries';
import bird1 from '../images/bird1.png';

class Home extends Component {
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

    return (
      <div>
        <img src={bird1} width={400} />
        <div>
          <h3>Journal Entries</h3>
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
  }
}

const mutation = gql`
  mutation DeleteEntry($id: ID) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(Home)
)

