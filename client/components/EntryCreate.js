import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchEntries';
import vintage1 from '../images/vintage1.jpg';


class EntryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      location: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { title: this.state.title, date: this.state.date, location: this.state.location },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <h3>Create a New Entry</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.value}
          />
          <label>Date:</label>
          <input
            onChange={event => this.setState({ date: event.target.value })}
            value={this.state.value}
          />
          <label>Location:</label>
          <input
            onChange={event => this.setState({ location: event.target.value })}
            value={this.state.value}
          />
        </form>
        <button className="btn green" onClick={this.onSubmit.bind(this)}>Save</button>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddEntry($title: String, $date: String, $location: String) {
    addEntry(title: $title, date: $date, location: $location) {
      title
      date
      location
    }
  }
`;

export default graphql(mutation)(EntryCreate);
