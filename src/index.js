import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from '@apollo/react-hooks';
import { BoardProvider } from './context/BoardContext';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  cache,
  link
});

// cache.writeData({
//   data: {
//     items: [],
//   }
// });

// const queryResult = cache.readQuery({
//   query: GET_LISTS
// });

// console.log('QUERY RES', queryResult);


ReactDOM.render(
    <ApolloProvider client={client}>
      <BoardProvider>
        <App />
      </BoardProvider>
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
