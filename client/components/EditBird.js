import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

//NEED TO PROVIDE THESE PROPS:
//this.props.data.entry.birds -> this.props.birds


class EditBird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name
    }
    // this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
  }

  // onEdit() {
  //   event.preventDefault();
  //   this.setState({ edit: !this.state.edit })
  // }

  onChange(ev) {
    this.setState({ [ ev.target.name ]: ev.target.value });
  }

  onSubmitName(id, name) {
    this.props.mutate({ 
      variables: { 
        id: this.state.id,
        name: this.state.name
      } 
    })
  }
  
  render() {
    return (
      <div>              
              <label>Edit Bird:</label>
              <input
                onChange={ this.onChange }
                value={this.state.name}
                name="name"
              />
              <button className="btn blue" onClick={this.onSubmitName}>Change Bird</button>
  

      </div>
      
    )
      
  }
}

const mutation = gql`
  mutation editBird($id: ID, $name: String) {
    editBird(id: $id, name: $name) {
      id
      name
    }
  }
`;




export default graphql(mutation)(EditBird);
