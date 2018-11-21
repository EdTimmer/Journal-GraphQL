import gql from 'graphql-tag';

export default gql`
  query EntryQuery($id: ID!) {
    entry(id: $id) {
      id
      title
      birds {
        id
        name
        likes
      }
    }
  }
`;
