import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchEntry from '../queries/fetchEntry';  //fetching Entry here

class BirdListEdit extends Component {

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeBird: {
          id: id,
          __typename: 'BirdType',
          likes: likes + 1
        }
      }
    });
  }

  onBirdDelete(id) {
    this.props.mutate({ variables: { id } })
      // .then(() => console.log('this.props.entry is:', this.props.entry))
      // .then(() => props.refetch());
      // .then(this.props.runAgain())
  }

  renderBirds() {
    return this.props.birds.map(({ id, name, likes }) => {
      return (
        <li key={id} className="collection-item">
          {name}
          <i
            className="material-icons"
            onClick={() => this.onBirdDelete(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    // console.log(this.props)
    if (this.props.loading) {
      return null;
    }
    else {
      return (
        <div>
          <h3>Edit Birds List</h3>
          <ul className="collection">
            {this.renderBirds()}
          </ul>
        </div>
      )
    }
  }
}

// const mutation = gql`
//   mutation LikeBird($id: ID) {
//     likeBird(id: $id) {
//       id
//       likes
//     },
//     deleteBird(id: $id) {
//       id
//       likes
//     }
//   }
// `;

const mutation = gql`
  mutation DeleteBird($id: ID) {
    deleteBird(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(BirdListEdit);


// export default graphql(mutation)(
//   graphql(fetchEntry, {
//   options: (props) => { return { variables: { id: props.id } } }
// })(BirdListEdit)
// )