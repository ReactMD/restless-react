import React from "react";
import { Query } from "react-apollo";
import BookTable from "../components/BookTable";
import { GET_BOOKS } from "../queries";

// result is passed to child of query as props
const renderQueryResult = ({ loading, error, data }) => {
  if (loading) return <p>Loading the Books...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return <BookTable books={data.books} />;
};

const Books = () => {
  return <Query query={GET_BOOKS}>{renderQueryResult}</Query>;
};

export default Books;
