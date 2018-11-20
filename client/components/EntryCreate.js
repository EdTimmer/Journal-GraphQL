import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchEntries';


class EntryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h3>Create a New Entry</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Entry Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.value}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddEntry($title: String) {
    addEntry(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(EntryCreate);
