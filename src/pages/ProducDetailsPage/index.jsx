import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Radio } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actFetchShoeById } from "../../redux/features/Shoes/shoeSlice";
import {
  actAddToCart,
  actClearCart,
} from "../../redux/features/Carts/cartSlice";
import RenderComments from "../../components/Comment/Comments";
import { actCreateNewOder } from "../../redux/features/Oders/oderSlice";
import { format } from "date-fns";
const schema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  address: Yup.string().required("Please input address"),
  numberphone: Yup.string().required("Please input numberphone"),
});
const DetailsPage = () => {
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

  const shoe = useSelector((state) => state.shoe.currentShoe);
  const [valueSize, setValueSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const onChangeSize = (e) => {
    setValueSize(e.target.value);
  };
  const handlechangeQTY = (e) => {
    setQuantity(e.target.value);
  };
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(actFetchShoeById(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const salePercentage = shoe.price - (shoe.price * shoe.salePercentage) / 100;
  const handleAddCart = () => {
    if (valueSize === "" || quantity === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    if (isValid) {
      setIsValid(true);
      const salePercentage =
        shoe.price - (shoe.price * shoe.salePercentage) / 100;
      if (salePercentage > 0) {
        const productCart = {
          id: shoe.id,
          producer: shoe.producer,
          title: shoe.title,
          price: shoe.price,
          salePercentage: salePercentage,
          imageUrl: shoe.imageUrl,
          size: valueSize,
          quantity: parseFloat(quantity),
          total: parseFloat(quantity) * parseFloat(salePercentage),
        };
        dispatch(actAddToCart(productCart));
      } else {
        const productCart = {
          id: shoe.id,
          producer: shoe.producer,
          title: shoe.title,
          price: shoe.price,
          imageUrl: shoe.imageUrl,
          size: valueSize,
          quantity: parseFloat(quantity),
          total: parseFloat(quantity) * parseFloat(shoe.price),
        };
        dispatch(actAddToCart(productCart));
      }
    }
  };

  const handleAddOder = (values) => {
    if (valueSize === "" || quantity === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    if (isValid) {
      setIsValid(true);
      const salePercentage =
        shoe.price - (shoe.price * shoe.salePercentage) / 100;
      if (salePercentage > 0) {
        const day = new Date();
        const dataOder = {
          name: values.name,
          address: values.address,
          numberphone: values.numberphone,
          carts: [
            {
              id: shoe.id,
              producer: shoe.producer,
              title: shoe.title,
              price: shoe.price,
              salePercentage: salePercentage,
              imageUrl: shoe.imageUrl,
              size: valueSize,
              quantity: parseFloat(quantity),
              total: parseFloat(quantity) * parseFloat(salePercentage),
            },
          ],
          idUser: userInfo.id,
          total: parseFloat(quantity) * parseFloat(salePercentage),
          createAt: format(day, "dd/MM/yyyy"),
        };
        dispatch(actCreateNewOder(dataOder));
        dispatch(actClearCart());
        setIsModalOpen(false);
      } else {
        const day = new Date();
        const dataOder = {
          name: values.name,
          address: values.address,
          numberphone: values.numberphone,
          carts: [
            {
              id: shoe.id,
              producer: shoe.producer,
              title: shoe.title,
              price: shoe.price,
              imageUrl: shoe.imageUrl,
              size: valueSize,
              quantity: parseFloat(quantity),
              total: parseFloat(quantity) * parseFloat(shoe.price),
            },
          ],
          idUser: userInfo.id,
          total: parseFloat(quantity) * parseFloat(shoe.price),
          createAt: format(day, "dd/MM/yyyy"),
        };
        dispatch(actCreateNewOder(dataOder));
        dispatch(actClearCart());
        setIsModalOpen(false);
      }
    }
  };
  const size = shoe.size;
  const renderSize = () => {
    return size?.map((e) => {
      return (
        <Radio value={e}>
          {e >= 100 ? <span>{e} ml</span> : <span>Size {e}</span>}
        </Radio>
      );
    });
  };
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="details">
        <div className="details__img">
          <img className="details__img" src={shoe.imageUrl} alt="img" />
        </div>
        <div className="details__content">
          <h3 className="details__content-item">{shoe.title}</h3>
          {shoe.salePercentage ? (
            <div
              className="details__content-item"
              style={{ fontWeight: 600, color: "red", fontSize: 20 }}
            >
              Giá: <span> {formatNumber(salePercentage)}₫</span>{" "}
              <span style={{ textDecoration: "line-through" }}>
                {" "}
                {formatNumber(shoe.price)}₫{" "}
              </span>
            </div>
          ) : (
            <div
              className="details__content-item"
              style={{ fontWeight: 600, color: "red", fontSize: 20 }}
            >
              Giá: {formatNumber(shoe.price)}₫
            </div>
          )}
          {shoe.producer === "Mycare" ? (
            ""
          ) : (
            <div className="details__content-item">
              <p>Lựa chọn size</p>
              <Radio.Group
                name="radiogroup"
                value={valueSize}
                onChange={onChangeSize}
                style={{ fontWeight: 500 }}
              >
                {renderSize()}
              </Radio.Group>
            </div>
          )}
          <div className="details__content-item">
            <label>Số lượng</label>
            <input
              className="quantity"
              type="number"
              defaultValue={1}
              onChange={handlechangeQTY}
              min={0}
              style={{ width: 50, marginLeft: 10, textAlign: "center" }}
            ></input>
          </div>
          {isValid ? (
            ""
          ) : (
            <span style={{ color: "red" }}>Vui lòng chọn size và số lượng</span>
          )}
          <div className="details-btn">
            <Button
              className="details-btn"
              style={{ backgroundColor: "blue" }}
              onClick={handleAddCart}
            >
              THÊM VÀO GIỎ
            </Button>
            <div>
              <Button
                type="primary"
                className="details-btn"
                style={{ backgroundColor: "red" }}
                onClick={showModal}
              >
                Thanh toán
              </Button>
              <Modal
                title="thanh toán đơn hàng "
                open={isModalOpen}
                onOk={handleSubmit(handleAddOder)}
                onCancel={handleCancel}
                className="block_pay"
              >
                {isAuth ? (
                  <div>
                    <h3 className="block_pay_item"> Thông tin giao hàng</h3>
                    <form
                      className="input-form"
                      onSubmit={handleSubmit(handleAddOder)}
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
                      Tổng số tiền:
                      {shoe.salePercentage ? (
                        <span>
                          {formatNumber(
                            parseFloat(salePercentage) * parseFloat(quantity)
                          )}
                        </span>
                      ) : (
                        <span>
                          {formatNumber(
                            parseFloat(shoe.price) * parseFloat(quantity)
                          )}
                        </span>
                      )}
                    </h4>
                  </div>
                ) : (
                  <div>Bạn chưa đăng nhập</div>
                )}
              </Modal>
            </div>
          </div>
          <div className="container text-center">
            <div className="row">
              <div className="col col-item">
                <img
                  src="https://th.bing.com/th/id/OIP.ArnsbBHaHhkL2mLswBhA1QHaHa?w=201&h=201&c=7&r=0&o=5&pid=1.7"
                  alt="img"
                  style={{ width: 50 }}
                />
                <p>Hàng chính hãng, chất lượng cao.</p>
              </div>
              <div className="col col-item">
                <img
                  src="https://th.bing.com/th/id/OIP.1p3CjZvyl0OJ6b7LhGi0DgHaHa?w=152&h=180&c=7&r=0&o=5&pid=1.7"
                  alt="img"
                  style={{ width: 50 }}
                />
                <p>Miễn phí giao hàng với đơn lớn hơn 500k</p>
              </div>
              <div className="col col-item">
                <img
                  src="https://th.bing.com/th/id/OIP.nGOL7eR0qBWfKBX-Ha-7ZgHaHa?pid=ImgDet&rs=1"
                  alt="img"
                  style={{ width: 50 }}
                />
                <p>Đổi hàng 30 ngày thủ tục đơn giản</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="describe">
        <h3 style={{ margin: 10 }}>MÔ TẢ SẢN PHẨM</h3>
        <p style={{ margin: 10 }}>{shoe.description}</p>
      </div>
      <div>
        <RenderComments
          productDetails={shoe}
          userProfile={userInfo}
          isAuth={isAuth}
        />
      </div>
    </>
  );
};

export default DetailsPage;
