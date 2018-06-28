import React from "react";

const getBookList = books => {
  return (
    <ul>
      {books.map(book => {
        const { id, title } = book;
        return <li key={"book" + id}>{title}</li>;
      })}
    </ul>
  );
};

const AuthorTable = ({ authors }) => {
  const tableRows = authors.map(author => {
    const { id, name, books } = author;
    return (
      <tr key={"author" + id}>
        <td>{name}</td>
        <td>{getBookList(books)}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Books</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default AuthorTable;
