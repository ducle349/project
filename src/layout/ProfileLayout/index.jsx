import React from "react";
import "./style.scss";
import { Outlet } from "react-router-dom";
import Hearder from "../../components/Hearder";
import Footer from "../../components/Footer";
import ProfileUser from "../../pages/Profileuser";
const ProfileLayout = () => {
  return (
    <>
      <Hearder />
      <div className="layoutprofile">
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
