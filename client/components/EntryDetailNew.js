import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import fetchEntry from '../queries/fetchEntry';
import BirdCreate from './BirdCreate';


class EntryDetailNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit() {
    event.preventDefault();
    this.setState({ edit: !this.state.edit })
  }
  onBirdDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderBirds() {

    return this.props.data.entry.birds.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          {
            this.state.edit ? (
              <i
                className="material-icons"
                onClick={() => this.onBirdDelete(id)}
              >
                delete
              </i>
            ) : (null)
          }
        </li>
      )
    })
  }
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
          <button onClick={this.onEdit}>Edit Bird List</button>
          <h3>{entry.title}</h3>
          <div>
            <h3>Birds List</h3>
            <ul className="collection">
              {this.renderBirds()}
            </ul>
          </div>
          <BirdCreate entryId={this.props.params.id} />
        </div>
      )
    }
  }
}

const mutation = gql`
  mutation DeleteBird($id: ID) {
    deleteBird(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(
  graphql(fetchEntry, {
    options: (props) => { return { variables: { id: props.params.id } } }
  })(EntryDetailNew)
)