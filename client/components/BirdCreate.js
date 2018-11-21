import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class BirdCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.mutate({
      variables: {
        name: this.state.name,
        entryId: this.props.entryId
      }
    }).then(() => this.setState({ name: '' }))
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Bird</label>
        <input 
          value={this.state.name}
          onChange={event => this.setState({ name: event.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddBirdToEntry($name: String, $entryId: ID) {
    addBirdToEntry(name: $name, entryId: $entryId) {
      id 
      birds {
        id
        name
        likes
      }
    }
  }
`;

export default graphql(mutation)(BirdCreate);
