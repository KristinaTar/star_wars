import React, { ReactNode } from "react";
import { LayoutStyled } from "./Layout.styled";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode | ReactNode[]
}
const Layout: React.FC<Props> = ({children}) => {
  return (
    <LayoutStyled>
      <Link to={'/'}>
        <div className="layout-header" />
      </Link>
      <div className="layout-content">
        {children}
      </div>
    </LayoutStyled>
  );
};

export default Layout;
