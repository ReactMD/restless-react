import React from "react";

import Books from "./Books";
import { Subscription } from "react-apollo";

import { BOOK_UPDATED } from "../subscriptions";

const LiveBooks = () => {
  return (
    <div>
      <Subscription subscription={BOOK_UPDATED}>{() => <Books />}</Subscription>
    </div>
  );
};

export default LiveBooks;
