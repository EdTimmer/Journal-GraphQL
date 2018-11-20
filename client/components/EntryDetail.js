import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import fetchEntry from '../queries/fetchEntry';
import BirdCreate from './BirdCreate';
import EditTitle from './EditTitle';
import EntryDelete from './EntryDelete';
import bird2 from '../images/bird2.png';

class EntryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      // title: 'state title',
      id: this.props.data.entry ? this.props.data.entry.id : '',
      title: this.props.data.entry ? this.props.data.entry.title : ''
    }
    this.onEdit = this.onEdit.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.onSubmitTitle = this.onSubmitTitle.bind(this);
  }

  onEdit() {
    event.preventDefault();
    this.setState({ edit: !this.state.edit })
  }

  // onEntryEdit(id) {
  //   this.props.mutate({ variables: { id } })
  //     .then(() => this.props.data.refetch());
  // }

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
      console.log(this.state)
      const theTitle = this.state.title ? this.state.title : ''
      return (
        <div>
          <Link to="/">Home</Link>
          <button onClick={this.onEdit}> Edit </button>
          <img src={bird2} width={400} />
          <h3>{entry.title}</h3>

          {
            this.state.edit ? (
              <EditTitle id={this.props.data.entry.id} title={this.props.data.entry.title} />
            ) : (null)
          }

          <div>
            <h3>Birds List</h3>
            <ul className="collection">
              {this.renderBirds()}
            </ul>
          </div>
          <BirdCreate entryId={this.props.params.id} />
          <div>
            {
              this.state.edit ? (
                <EntryDelete id={this.props.data.entry.id} onClick={() => this.props.data.refetch()} />
              ) : (null)
            }
          </div>
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
  },
`;




export default graphql(mutation)(
  graphql(fetchEntry, {
    options: (props) => { return { variables: { id: props.params.id } } }
  })(EntryDetail)
)