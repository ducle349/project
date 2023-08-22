import React from "react";
import "./styleProfile.scss";
import { Outlet } from "react-router-dom";
import Hearder from "../../components/Hearder";
import Footer from "../../components/Footer";
import ProfileUser from "../../pages/Profileuser";
const ProfileLayout = () => {
  return (
    <>
      <div
        className="main-layout-container__hearder"
        style={{ zIndex: 3, position: "relative", width: "100%" }}
      >
        <Hearder />
      </div>
      <div
        className="layoutprofile"
        style={{ zIndex: 2, position: "relative" }}
      >
        <div className="layoutprofile_sibar">
          <ProfileUser className="layoutprofile_sibar-item" />
        </div>
        <div className="layoutprofile_content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileLayout;
