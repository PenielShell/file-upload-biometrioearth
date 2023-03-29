import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/css/auth.css';
import { ApolloProvider } from '@apollo/client';

//import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, createHttpLink , InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const httpLink = createHttpLink({
  uri: 'http://localhost:7070/graphql/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ?
          'JWT ' + token : null,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
