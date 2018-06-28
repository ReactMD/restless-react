import React from "react";

const BookTable = ({ books }) => {
  const tableRows = books.map(book => {
    const { title, author, id } = book;
    const { name } = author;
    return (
      <tr key={id}>
        <td>{title}</td>
        <td>{name}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default BookTable;
