import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <HashLoader
      color="#36b4d6"
      loading='true'
      size={100}
      className={HashLoader}
    />
  );};

export default Loader;
