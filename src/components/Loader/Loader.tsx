import React from "react";
import { LoaderStyled } from "./Loader.styled";

const Loader: React.FC = () => {
  return (
    <LoaderStyled>
      <h1 className="title">Loading. Please wait...</h1>
      <div className="loading" />
    </LoaderStyled>
  );
};

export default Loader;
