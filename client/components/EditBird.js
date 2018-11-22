import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class EditBird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
  }

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
        <form onSubmit={this.onSubmitName(this.state.id, this.state.name)}>    
          <label>Edit Bird:</label>
          <input
            onChange={ this.onChange }
            value={this.state.name}
            name="name"
          />
        </form>
          {/*<button className="btn blue" onClick={this.onSubmitName()}>Change Bird</button>*/}
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
