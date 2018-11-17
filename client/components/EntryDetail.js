import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchEntry from '../queries/fetchEntry';  //fetching Entry here
import BirdCreate from './BirdCreate';
import BirdList from './BirdList';
import BirdListEdit from './BirdListEdit';

class EntryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit() {
    event.preventDefault();
    this.setState({edit: !this.state.edit})
  }

  // runAgain() {
  //   return (() => this.props.refetch());
  // }

  // runAgain() {
  //   this.props.mutate({
  //     refetchQueries: [{ fetchEntry }]
  //   });
  // }

  render() {
    
    const { entry } = this.props.data 
    
    if (!entry) {
      return (
        <div>Loading...</div>
      );
    }
    else {
      const showEdit = this.state.edit ? (<BirdListEdit birds={entry.birds} />) : (<BirdList birds={entry.birds} />)
      return (
        <div>
          <Link to="/">Back</Link>
          <button onClick={this.onEdit}>Edit Bird List</button>
          <h3>{entry.title}</h3>
          {/*<BirdList birds={entry.birds} />*/}
          {showEdit}
          <BirdCreate entryId={this.props.params.id} />
        </div>
      )
    }
  }
}

export default graphql(fetchEntry, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(EntryDetail);
