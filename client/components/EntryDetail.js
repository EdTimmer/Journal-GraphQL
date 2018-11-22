import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import fetchEntry from '../queries/fetchEntry';
import BirdCreate from './BirdCreate';
import EditEntry from './EditEntry';
import EditBird from './EditBird';
import EntryDelete from './EntryDelete';
import bird2 from '../images/bird2.png';

class EntryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      id: this.props.data.entry ? this.props.data.entry.id : '',
      title: this.props.data.entry ? this.props.data.entry.title : '',
      date: this.props.data.entry ? this.props.data.entry.date : '',
      location: this.props.data.entry ? this.props.data.entry.location : '',
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
    return this.props.data.entry.birds.map(({ id, name, likes }) => {
      return (
        <li key={id} className="collection-item">
          {
            this.state.edit ? (
              <EditBird name={name} id={id} />
            ) : (<p>{name}</p>)
          }

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
      const theTitle = this.state.title ? this.state.title : ''
      return (
        <div>
          <div className="wrapper">
            <div className="box">
              <img src={bird2} width={400} className="image"/>
            </div>
            <div className="box">
              <h2>{entry.title}</h2>
              <div style={{padding: '30px'}}>
                <button className="btn green" onClick={this.onEdit}> Edit </button>
              </div>
            </div>          
          </div>
          


          <p><i>Date: </i>{entry.date}</p>
          <p style={{paddingBottom: '20px'}}><i>Location: </i>{entry.location}</p>

          {
            this.state.edit ? (
              <EditEntry entry={this.props.data.entry} />
            ) : (null)
          }

          <div>
            <h5><i>Species List</i></h5>
            <ul className="collection">
              {this.renderBirds()}
            </ul>
          </div>
          <div>

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