import React from "react";

import { Outlet } from "react-router-dom";
import Hearder from "../../components/Hearder";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <div className="main-layout-container" style={{ width: "100%" }}>
      <div
        className="main-layout-container__hearder"
        style={{ zIndex: 3, position: "relative", width: "100%" }}
      >
        <Hearder />
      </div>
      <div
        className="main-layout-container__content"
        style={{ zIndex: 2, position: "relative" }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
