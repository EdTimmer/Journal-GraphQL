import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchEntries';



class EntryDelete extends Component {
  constructor(props) {
    super(props);
    this.onEntryDelete = this.onEntryDelete.bind(this);
  }
  
  
  onEntryDelete() {
    this.props.mutate({ variables: { id: this.props.id } })
    .then(() => hashHistory.push('/'))
    .then(() => this.props.data.refetch());
  }

  render() {
    return (
      <div>
        <button onClick={this.onEntryDelete}>Delete Entire Entry</button>
      </div>
    )
  }

  // renderEntries() {
  //   return this.props.data.entries.map(({ id, title }) => {
  //     return (
  //       <li key={id} className="collection-item">
  //         <Link to={`/entries/${id}`}>
  //           {title}
  //         </Link>
  //         <i
  //           className="material-icons"
  //           onClick={() => this.onEntryDelete(id)}
  //         >
  //           delete
  //         </i>
  //       </li>
  //     );
  //   });
  // }

  // render() {
  //   if (this.props.data.loading) {
  //     return (
  //       <div>Loading...</div>
  //     );
  //   }
  //   // else {
  //     return (
  //       <div>
  //         <Link to="/">Home</Link>
  //         <div>
  //           <h3>Edit Journal Entries</h3>
  //         </div>
  //         <ul className="collection">
  //           {this.renderEntries()}
  //         </ul>
  //         <Link 
  //           to="/entries/new"
  //           className="btn-floating btn-large red right"     
  //         >
  //           <i className="material-icons">add</i>
  //         </Link>        
  //       </div>

  //     )
  //   // }    
  // }
}

const mutation = gql`
  mutation DeleteEntry($id: ID) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

export default graphql(mutation) (
  graphql(query)(EntryDelete)
)

// export default graphql(mutation)(EntryDelete);


