import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import CreateUser from "./CreateUser";

const MainNavigation = (props: any) => {
  return (
    <React.Fragment>
      <MainHeader>
        <h1 className="main-navigation__title">
          <Link to="/">Teste FullStack</Link>
        </h1>
        <nav className="main-navigation__header-nav"></nav>
        <CreateUser />
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
