import React, { useEffect, useState } from "react";
import { Button, Input, Radio } from "antd";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actFetchShoeById } from "../../redux/features/Shoes/shoeSlice";
import { actAddToCart } from "../../redux/features/Carts/cartSlice";
import RenderComments from "../../components/Comment/Comments";

const DetailsPage = () => {
  const { userInfo, isAuth } = useSelector((state) => state.user);
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
            <Input
              type="number"
              defaultValue={1}
              onChange={handlechangeQTY}
              min={0}
              style={{ width: 50, marginLeft: 10, textAlign: "center" }}
            ></Input>
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
            <Button className="details-btn" style={{ backgroundColor: "red" }}>
              MUA HÀNG NGAY
            </Button>
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
