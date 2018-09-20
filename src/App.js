import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import "./App.css";
import Books from "./components/Books";

import LiveBooks from "./components/LiveBooks";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/api/gql"
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/api/ws`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <h1>Greg's Books</h1>
        <div className="books-container">
          <Books />
          {/* <LiveBooks /> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
