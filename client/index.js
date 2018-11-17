import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import EntriesList from './components/EntriesList';
import EntriesListEdit from './components/EntriesListEdit';
import EntryCreate from './components/EntryCreate';
import EntryDetail from './components/EntryDetail';
import EntryDetailNew from './components/EntryDetailNew';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={EntriesList} />
          <Route path="/edit" component={EntriesListEdit} />
          <Route path="entries/new" component={EntryCreate} />
          <Route path="entries/:id" component={EntryDetailNew} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
