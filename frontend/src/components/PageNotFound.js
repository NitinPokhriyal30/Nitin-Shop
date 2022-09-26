import React, { useEffect } from "react";
import { toast } from "react-toastify";

const PageNotFound = (props) => {
  const { error } = props;

  useEffect(() => {
    toast.error(`${error}`);
  }, [error]);

  return <div>{error}</div>;
};

export default PageNotFound;
