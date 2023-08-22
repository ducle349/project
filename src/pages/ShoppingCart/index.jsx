import React, { useState } from "react";
import Cart from "../../components/Cart";

import { Button, Input, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import {
  actClearCart,
  actDeleteCart,
  actUpdateCart,
} from "../../redux/features/Carts/cartSlice";
import { actCreateNewOder } from "../../redux/features/Oders/oderSlice";
import format from "date-fns/format";
const schema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  address: Yup.string().required("Please input address"),
  numberphone: Yup.string().required("Please input numberphone"),
});
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { userInfo, isAuth } = useSelector((state) => state.user);
  const methods = useForm({
    defaultValues: {
      name: userInfo.name,
      address: userInfo.address,
      numberphone: userInfo.numberphone,
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const handleDeleteCart = (id) => {
    dispatch(actDeleteCart(id));
  };
  const handleUpdateCart = (cartUpdate) => {
    dispatch(actUpdateCart(cartUpdate));
  };
  const { carts } = useSelector((state) => state.cart);
  const renderTasklist = () => {
    return carts.map((cart) => {
      return (
        <Cart
          key={cart.id}
          cart={cart}
          handleDeleteCart={handleDeleteCart}
          handleUpdateCart={handleUpdateCart}
        />
      );
    });
  };
  const Price = carts.map((item) => {
    return item.total;
  });
  let sumPrice = Price.reduce(function (accumulator, element) {
    return parseFloat(accumulator) + parseFloat(element);
  }, 0);
  const formatNumber = (price) => {
    let priceString = "";
    while (price > 0) {
      let div = price % 1000;
      price = Math.floor(price / 1000);
      if (price !== 0) {
        if (div < 10) {
          div = "00" + div;
        } else if (div < 100) {
          div = "0" + div;
        }
        priceString = "." + div + priceString;
      } else {
        priceString = div + priceString;
      }
    }
    return priceString;
  };

  const hanldeCreateOder = (values) => {
    if (isAuth) {
      const day = new Date();
      const dataOder = {
        name: values.name,
        address: values.address,
        numberphone: values.numberphone,
        carts: carts,
        idUser: userInfo.id,
        total: sumPrice,
        createAt: format(day, "dd/MM/yyyy"),
      };
      dispatch(actCreateNewOder(dataOder));
      dispatch(actClearCart());
      setIsModalOpen(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="cart">
        <h2 className="cart-title">GIỎ HÀNG CỦA BẠN</h2>
        <div className="cart-content">
          <table class="table table-hover">
            <tbody>
              <tr>
                <td className="col1">Hình ảnh</td>
                <td className="col2">Tên sản phẩm</td>
                <td className="col3">Size</td>
                <td className="col4">Số lượng</td>
                <td className="col5">Đơn giá</td>
                <td className="col6">Tổng cộng</td>
                <td className="col7">Xóa</td>
              </tr>
              {renderTasklist(carts)}
            </tbody>
          </table>
          <div className="pay">
            <h5>THANH TOÁN ĐƠN HÀNG</h5>
            <p style={{ color: "red" }}>
              Tổng số tiền:{formatNumber(sumPrice) + "₫"}
            </p>
            <div>
              <Button type="primary" onClick={showModal}>
                Thanh toán
              </Button>
              <Modal
                title="thanh toán đơn hàng "
                open={isModalOpen}
                onOk={handleSubmit(hanldeCreateOder)}
                onCancel={handleCancel}
                className="block_pay"
              >
                {isAuth ? (
                  <div>
                    <h3 className="block_pay_item"> Thông tin giao hàng</h3>
                    <form
                      className="input-form"
                      onSubmit={handleSubmit(hanldeCreateOder)}
                    >
                      <div className="input-form__item">
                        <label
                          className="input-form__label"
                          style={{ minWidth: 100 }}
                        >
                          Họ và tên
                        </label>
                        <div>
                          <Controller
                            control={control}
                            name="name"
                            render={({ field }) => {
                              return (
                                <Input
                                  className="input-form__input"
                                  placeholder="Nhập tên người nhận"
                                  {...field}
                                />
                              );
                            }}
                          />
                          {!!errors.name?.message && (
                            <span style={{ color: "red" }}>
                              {errors.name?.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="input-form__item">
                        <label
                          className="input-form__label"
                          style={{ minWidth: 100 }}
                        >
                          Địa chỉ
                        </label>
                        <div>
                          <Controller
                            control={control}
                            name="address"
                            render={({ field }) => {
                              return (
                                <Input
                                  className="input-form__input"
                                  placeholder="Địa chỉ nhận hàng"
                                  {...field}
                                />
                              );
                            }}
                          />
                          {!!errors.address?.message && (
                            <span style={{ color: "red" }}>
                              {errors.address?.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="input-form__item">
                        <label
                          className="input-form__label"
                          style={{ minWidth: 100 }}
                        >
                          Số điện thoại
                        </label>
                        <div>
                          <Controller
                            control={control}
                            name="numberphone"
                            render={({ field }) => {
                              return (
                                <Input
                                  className="input-form__input"
                                  placeholder="Nhập Số điện thoại người nhận"
                                  {...field}
                                />
                              );
                            }}
                          />
                          {!!errors.numberphone?.message && (
                            <span style={{ color: "red" }}>
                              {errors.numberphone?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </form>
                    <h4 className="block_pay_item" style={{ color: "red" }}>
                      Tổng số tiền:{formatNumber(sumPrice) + "₫"}
                    </h4>
                  </div>
                ) : (
                  <div>Bạn chưa đăng nhập</div>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
