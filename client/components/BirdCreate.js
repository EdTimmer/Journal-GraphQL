import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class BirdCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.mutate({
      variables: {
        content: this.state.content,
        entryId: this.props.entryId
      }
    }).then(() => this.setState({ content: '' }))
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Bird</label>
        <input 
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddBirdToEntry($content: String, $entryId: ID) {
    addBirdToEntry(content: $content, entryId: $entryId) {
      id 
      birds {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(BirdCreate);
