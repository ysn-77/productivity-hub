import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, from } from '@apollo/client';


const API_URL = 'http://localhost:3000/graphql';

const httpLink = new HttpLink({ uri: API_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'User-Id': localStorage.getItem('currentUserId'),
    }
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    authMiddleware,
    httpLink
  ]),
});

