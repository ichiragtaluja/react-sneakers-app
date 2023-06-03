import React from "react";
import { SyncLoader } from "react-spinners";
import { useData } from "../../contexts/DataProvider";

export const Loader = () => {
  const { loading } = useData();
  const override = {
    position: "absolute",
    top: "50vh",
    left: "50vw",
  };
  return <SyncLoader cssOverride={override} loading={loading} color="black" />;
};
