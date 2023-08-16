import React, { useEffect } from "react";

import "./style.scss";

import { Spin } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { actFetchAllOder } from "../../redux/features/Oders/oderSlice";
import Oder from "../../components/Oder";

const Oders = () => {
  const { oders, isLoading } = useSelector((state) => state.oder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchAllOder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOders = () => {
    return oders.map((oder) => {
      return oder.carts.map((e) => {
        return <Oder e={e} createAt={oder.createAt} />;
      });
    });
  };
  console.log(renderOders(oders));
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
                <td>Hình ảnh</td>
                <td>Tên sản phẩm</td>
                <td>Size</td>
                <td>Số lượng</td>
                <td>Đơn giá</td>
                <td>Tổng cộng</td>
                <td>Ngày</td>
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
