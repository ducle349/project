import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import "./stylecardsale.scss";
const CardSale = (props) => {
  const { item } = props;
  console.log("id", item);
  const navigate = useNavigate();
  const handleToDtailPage = () => {
    const shoeId = props.item.id;
    navigate(generatePath(ROUTES.DETAILS_PAGE, { id: shoeId }));
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
  const salePercentage = item.price - (item.price * item.salePercentage) / 100;
  return (
    <div className="card item" onClick={handleToDtailPage}>
      <img src={item.imageUrl} alt="img" className="card-img-top " />
      <div className="card-body">
        <div className="img-sale">
          <img
            className="img-sale"
            src="https://static.vecteezy.com/system/resources/previews/000/554/854/original/sale-text-badge-sign-vector.jpg"
            alt="sale"
          ></img>
        </div>
        <p className="card-title" style={{ minHeight: 75 }}>
          {item.title}
        </p>
        <p className="card-text" style={{ color: "red" }}>
          Giá cũ:{" "}
          <span style={{ color: "red", textDecoration: "line-through" }}>
            {" "}
            {formatNumber(item.price)}₫
          </span>
        </p>
        <p className="card-text" style={{ color: "red" }}>
          Giá mới:
          {formatNumber(salePercentage)}₫
        </p>
      </div>
    </div>
  );
};

export default CardSale;
