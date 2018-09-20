import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_QUANTITY = gql`
  mutation AddBookQuantity($id: Int!) {
    addBookQuantity(id: $id) {
      id
      quantity
    }
  }
`;

const AddBookMutation = ({ id }) => (
  <Mutation mutation={ADD_QUANTITY}>
    {(addBookQuantity, { data }) => (
      <div>
        <button onClick={() => addBookQuantity({ variables: { id } })}>
          +
        </button>
      </div>
    )}
  </Mutation>
);

export default AddBookMutation;
