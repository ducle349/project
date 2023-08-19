import React from "react";
import "./style.scss";
import { DeleteOutlined } from "@ant-design/icons";

const Cart = (props) => {
  const {
    id,
    producer,
    title,
    price,
    imageUrl,
    size,
    quantity,
    total,
    salePercentage,
  } = props.cart;

  const { handleDeleteCart, handleUpdateCart } = props;
  // const total = parseFloat(props.cart.quantity) * parseFloat(props.cart.price);
  const handleChangeQuantity = (e) => {
    const salePercentage = props.cart.salePercentage;

    if (salePercentage > 0) {
      const cartUpdate = {
        id: id,
        producer: producer,
        title: title,
        price: price,
        imageUrl: imageUrl,
        size: size,
        salePercentage: salePercentage,
        quantity: parseFloat(e.target.value), //them quantit
        total: parseFloat(e.target.value) * parseFloat(salePercentage),
      };
      handleUpdateCart(cartUpdate);
    } else {
      const cartUpdate = {
        id: id,
        producer: producer,
        title: title,
        price: price,
        imageUrl: imageUrl,
        size: size,
        quantity: parseFloat(e.target.value), //them quantity
        total: parseFloat(e.target.value) * parseFloat(props.cart.price),
      };
      handleUpdateCart(cartUpdate);
    }
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
      <tr>
        <td>
          <img src={imageUrl} alt="img" style={{ width: 100 }} />
        </td>
        <td>{title}</td>
        <td>{size >= 100 ? <span>{size} ml</span> : <span>{size}</span>}</td>
        <td>
          <input
            type="number"
            onClick={handleChangeQuantity}
            defaultValue={quantity}
            style={{ width: 50, paddingLeft: 3 }}
            min={0}
          ></input>
        </td>
        <td>
          {salePercentage ? (
            <span>{formatNumber(salePercentage)}₫</span>
          ) : (
            <span>{formatNumber(price)}₫</span>
          )}
        </td>
        <td>{formatNumber(total)}₫</td>
        <td>
          <DeleteOutlined
            onClick={() => {
              handleDeleteCart(id);
            }}
          ></DeleteOutlined>
        </td>
      </tr>
    </>
  );
};

export default Cart;
