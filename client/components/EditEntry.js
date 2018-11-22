import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class EditEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.entry ? this.props.entry.id : '',
      title: this.props.entry ? this.props.entry.title : '',
      date: this.props.entry ? this.props.entry.date : '',
      location: this.props.entry ? this.props.entry.location : '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmitTitle = this.onSubmitTitle.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmitTitle() {
    this.props.mutate({
      variables: {
        id: this.state.id,
        title: this.state.title,
        date: this.state.date,
        location: this.state.location
      }
    })
  }

  render() {
    const theTitle = this.state.title ? this.state.title : '';
    const theDate = this.state.date ? this.state.date : '';
    const theLocation = this.state.location ? this.state.location : '';
    return (
      <div>
        <form onSubmit={this.onSubmitTitle}>
          <label>Edit Title:</label>
          <input
            onChange={this.onChange}
            value={theTitle}
            name="title"
          />
        </form>
        <form onSubmit={this.onSubmitTitle}>
          <label>Edit Date:</label>
          <input
            onChange={this.onChange}
            value={theDate}
            name="date"
          />
        </form>
        <form onSubmit={this.onSubmitTitle}>
          <label>Edit Location:</label>
          <input
            onChange={this.onChange}
            value={theLocation}
            name="location"
          />
        </form>
        {/*<button className="btn blue" onClick={this.onSubmitTitle}>Edit</button>*/}
      </div>
    )
  }
}

const mutation = gql`
  mutation editEntry($id: ID, $title: String, $date: String, $location: String) {
    editEntry(id: $id, title: $title, date: $date, location: $location) {
      id
      title
      date
      location
    }
  }
`;




export default graphql(mutation)(EditEntry);
