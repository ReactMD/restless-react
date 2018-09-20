import gql from "graphql-tag";

export const BOOK_UPDATED = gql`
  subscription onBookUpdated($id: Int) {
    bookUpdated(id: $id) {
      id
      quantity
    }
  }
`;
