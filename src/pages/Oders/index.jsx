import React, { useEffect } from "react";

import "./styleOders.scss";

import { Spin } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { actFetchAllOder } from "../../redux/features/Oders/oderSlice";
import Oder from "../../components/Oder";

const Oders = () => {
  const { oders, isLoading } = useSelector((state) => state.oder);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userInfoId = userInfo.id;
  useEffect(() => {
    dispatch(
      actFetchAllOder({
        idUser: userInfoId,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfoId]);

  const renderOders = () => {
    return oders.map((oder) => {
      return oder.carts.map((e) => {
        return <Oder e={e} createAt={oder.createAt} />;
      });
    });
  };
  if (isLoading) {
    return <Spin />;
  }
  return (
    <>
      <div className="cart">
        <h2 className="cart-title">Đơn hàng đã mua</h2>
        <div className="cart-content">
          <table className="table">
            <tbody>
              <tr>
                <td className="col1 col1oder">Hình ảnh</td>
                <td className="col2">Tên sản phẩm</td>
                <td className="col3">Size</td>
                <td className="col4">Số lượng</td>
                <td className="col5">Đơn giá</td>
                <td className="col6">Tổng cộng</td>
                <td className="col7">Ngày</td>
              </tr>
              {renderOders(oders)}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Oders;
