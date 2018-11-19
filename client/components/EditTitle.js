import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import fetchEntry from '../queries/fetchEntry';
import BirdCreate from './BirdCreate';


class EditTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // edit: false,
      // id: this.props.data.entry ? this.props.data.entry.id : '',
      // title: this.props.data.entry ? this.props.data.entry.title : ''
      id: this.props.id,
      title: this.props.title
    }
    this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitTitle = this.onSubmitTitle.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.data.entry) {
  //     this.setState({
  //       title: nextProps.data.entry ? nextProps.data.entry.title : 'next props title'
  //     });
  //   }
  // }

  onEdit() {
    event.preventDefault();
    this.setState({ edit: !this.state.edit })
  }

  onEntryEdit(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  // onBirdDelete(id) {        
  //   this.props.mutate({ variables: { id, title } })
  //     .then(() => this.props.data.refetch());
  // }

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
      // .then(() => this.props.data.refetch());
  }
  
  render() {    

    // const { entry } = this.props.data

    // if (!entry) {
    //   return (
    //     <div>Loading...</div>
    //   );
    // }
    // else {
    //   console.log(this.state)
      const theTitle = this.state.title ? this.state.title : ''
      return (
        <div>
          <label>Edit Title:</label>
          <input
            onChange={ this.onChange }
            value={theTitle}
            name="title"
          />
          <button onClick={this.onSubmitTitle}>Change Title</button>
        </div>
      )
    // }
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

// export default graphql(mutation)(
//   graphql(fetchEntry, {
//     options: (props) => { return { variables: { id: props.params.id } } }
//   })(EditTitle)
// )
