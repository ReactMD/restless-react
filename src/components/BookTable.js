import React from "react";
import AddBookMutation from "../mutations/AddBookMutation";
import RemoveBookMutation from "../mutations/RemoveBookMutation";
const BookTable = ({ books }) => {
  const tableRows = books.map(book => {
    const { title, author, id, quantity } = book;
    const { name } = author;
    return (
      <tr key={id}>
        <td>{title}</td>
        <td>{name}</td>
        <td>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>{quantity}</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <AddBookMutation id={id} />
              <RemoveBookMutation id={id} quantity={quantity} />
            </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <table cellspacing="0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default BookTable;
