import React from "react";
import {Outlet} from "react-router-dom";
import Navibar from "../Navbar";

const Layout = () => {
  return (
    <>
      <Navibar />
      <Outlet />
    </>
  );
};

export default Layout;
