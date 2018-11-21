import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class EditTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title
    }
    this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitTitle = this.onSubmitTitle.bind(this);
  }

  onEdit() {
    event.preventDefault();
    this.setState({ edit: !this.state.edit })
  }

  onChange(ev) {
    this.setState({ [ ev.target.name ]: ev.target.value });
  }

  onSubmitTitle() {
    this.props.mutate({ 
      variables: { 
        id: this.state.id,
        title: this.state.title
      } 
    })
  }
  
  render() {
    const theTitle = this.state.title ? this.state.title : ''
    return (
      <div>
        <label>Edit Title:</label>
        <input
          onChange={ this.onChange }
          value={theTitle}
          name="title"
        />
        <button className="btn blue" onClick={this.onSubmitTitle}>Change Title</button>          
      </div>
    )
  }
}

const mutation = gql`
  mutation editEntry($id: ID, $title: String) {
    editEntry(id: $id, title: $title) {
      id
      title
    }
  }
`;




export default graphql(mutation)(EditTitle);
