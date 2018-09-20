import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const REMOVE_QUANTITY = gql`
  mutation RemoveBookQuantity($id: Int!) {
    removeBookQuantity(id: $id) {
      id
      quantity
    }
  }
`;

const RemoveBookMutation = ({ id, quantity }) => (
  <Mutation mutation={REMOVE_QUANTITY}>
    {(removeBookQuantity, { data }) => (
      <div>
        <button
          disabled={quantity < 1}
          onClick={() => removeBookQuantity({ variables: { id } })}
        >
          -
        </button>
      </div>
    )}
  </Mutation>
);

export default RemoveBookMutation;
