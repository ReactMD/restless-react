import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import Books from "./containers/Books";
import Authors from "./containers/Authors";

const client = new ApolloClient({
  uri: "https://vm0lxnn5m3.lp.gql.zone/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <h1>GraphQL Books</h1>
        <div className="books-container">
          <Books />
          <Authors />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
