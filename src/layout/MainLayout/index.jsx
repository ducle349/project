import React from "react";

import { Outlet } from "react-router-dom";
import Hearder from "../../components/Hearder";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <div className="main-layout-container__hearder">
        <Hearder />
      </div>

      <div className="main-layout-container__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
