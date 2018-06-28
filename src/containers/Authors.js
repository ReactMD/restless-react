import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AuthorTable from "../components/AuthorTable";

const Authors = () => {
  const query = gql`
    {
      authors {
        id
        name
        books {
          id
          title
        }
      }
    }
  `;

  // result is passed to child of query as props
  const renderQueryResult = ({ loading, error, data }) => {
    if (loading) return <p>Loading the Authors...</p>;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;

    return <AuthorTable authors={data.authors} />;
  };

  return <Query query={query}>{renderQueryResult}</Query>;
};

export default Authors;
