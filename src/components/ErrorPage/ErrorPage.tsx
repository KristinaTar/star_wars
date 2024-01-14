import React from "react";
import { ErrorPageStyled } from "./ErrorPage.styled";

const ErrorPage: React.FC = () => {
  return (
    <ErrorPageStyled>
      <h1 className="title">Something went wrong</h1>
    </ErrorPageStyled>
  );
};

export default ErrorPage;
