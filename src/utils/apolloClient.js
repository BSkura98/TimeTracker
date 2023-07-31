import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:3000/graphql" }),
]);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
