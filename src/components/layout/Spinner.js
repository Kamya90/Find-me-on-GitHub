import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        id="loader"
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          display: "block",
        }}
      />
    </Fragment>
  );
};

export default Spinner;
