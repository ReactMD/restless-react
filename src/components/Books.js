import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import BookTable from "../components/BookTable";

const Books = () => {
  const query = gql`
    {
      books {
        id
        title
        quantity
        author {
          id
          name
        }
      }
    }
  `;

  // result is passed to child of query as props
  const renderQueryResult = ({ loading, error, data }) => {
    if (loading) return <p>Loading the Books...</p>;
    if (error) return <p>{JSON.stringify(error)}</p>;

    return <BookTable books={data.books} />;
  };

  return <Query query={query}>{renderQueryResult}</Query>;
};

export default Books;
