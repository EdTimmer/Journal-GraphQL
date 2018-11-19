import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import fetchEntry from '../queries/fetchEntry';
import BirdCreate from './BirdCreate';
import EditTitle from './EditTitle';


class EntryDetailNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      // title: 'state title',
      id: this.props.data.entry ? this.props.data.entry.id : '',
      title: this.props.data.entry ? this.props.data.entry.title : ''
    }
    this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitTitle = this.onSubmitTitle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.entry) {
      this.setState({
        title: nextProps.data.entry ? nextProps.data.entry.title : 'next props title'
      });
    }
  }

  onEdit() {
    event.preventDefault();
    this.setState({ edit: !this.state.edit })
  }

  onEntryEdit(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  onBirdDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmitTitle() {
    // event.preventDefault();
    this.props.mutate({
      variables: {
        id: this.props.data.entry.id,
        title: this.state.title
        // title: this.state.title 
      }
    })
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
          <Link to="/">Back</Link>
          <button onClick={this.onEdit}>Edit Bird List</button>
          <h3>{entry.title}</h3>

          {/*<form>*/}
          <label>Edit Title:</label>
          <input
            onChange={this.onChange}
            value={theTitle}
            name="title"
          />
          <button onClick={this.onSubmitTitle(event)}>Change Title</button>
          {/*</form>*/}
          <h4>Edit Title Component (New):</h4>
          <EditTitle id={this.props.data.entry.id} title={this.props.data.entry.title}/>

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
  },
  # mutation editEntry($id: ID, $title: String) {
  #   editEntry(id: $id, title: $title) {
  #     id
  #     title
  #   }
  # }
`;




export default graphql(mutation)(
  graphql(fetchEntry, {
    options: (props) => { return { variables: { id: props.params.id } } }
  })(EntryDetailNew)
)