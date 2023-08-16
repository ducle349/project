import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
const InfoUser = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <>
      <div className="info-main">
        <Avatar size={100} icon={<UserOutlined />} />
        <div>
          <p>Tên đăng nhập: {userInfo.name}</p>
        </div>
        <div>
          <p>Email: {userInfo.email}</p>
        </div>
        <div>
          <p>Địa chỉ: {userInfo.address}</p>
        </div>
        <div>
          <p>Số điện thoại: {userInfo.numberphone}</p>
        </div>
      </div>
    </>
  );
};

export default InfoUser;
