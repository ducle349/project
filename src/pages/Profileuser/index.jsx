import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { ROUTES } from "../../constants/Routes";

const ProfileUser = () => {
  return (
    <>
      <ul className="menu-profile">
        <li className="menu-profile_list">
          <Link to={ROUTES.INFORUSER_PAGE} className="menu-profile_listitem">
            THÔNG TIN CÁ NHÂN
          </Link>
        </li>
        <li className="menu-profile_list">
          <Link to={ROUTES.UPDATEUSER_PAGE} className="menu-profile_listitem">
            CẬP NHẬT THÔNG TIN CÁ NHÂN
          </Link>
        </li>
        <li className="menu-profile_list">
          <Link to={ROUTES.UPDATEPASS_PAGE} className="menu-profile_listitem">
            ĐỔI MẬT KHẨU
          </Link>
        </li>
        <li className="menu-profile_list">
          <Link to={ROUTES.ODER_PAGE} className="menu-profile_listitem">
            {" "}
            XEM LỊCH SỬ ĐƠN HÀNG
          </Link>
        </li>
      </ul>
    </>
  );
};
export default ProfileUser;
