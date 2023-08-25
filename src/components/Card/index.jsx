import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import "./style.scss";
const Card = (props) => {
  const navigate = useNavigate();
  const handleRedirectToDtailPage = () => {
    const shoeId = props.shoe.id;
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
  const salePercentage =
    props.shoe.price - (props.shoe.price * props.shoe.salePercentage) / 100;
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item">
      <div className="card" onClick={handleRedirectToDtailPage}>
        {props.shoe.salePercentage ? (
          <div className="img-sale">
            <img
              className="img-sale "
              src="https://static.vecteezy.com/system/resources/previews/000/554/854/original/sale-text-badge-sign-vector.jpg"
              alt="sale"
            ></img>
          </div>
        ) : (
          ""
        )}
        {props.shoe.salePercentage ? (
          <div className="salePercentage">{props.shoe.salePercentage}%</div>
        ) : (
          ""
        )}
        <img
          src={props.shoe.imageUrl}
          alt="img"
          className="card-img-top img-card "
        />
        <div className="card-body" style={{ padding: 0 }}>
          <p className="card-text" style={{ margin: 0 }}>
            {props.shoe.producer}
          </p>
          <p className="card-title" style={{ minHeight: 70, margin: 0 }}>
            {" "}
            {props.shoe.title}
          </p>
          {props.shoe.salePercentage ? (
            <p
              className="card-text"
              style={{
                color: "red",
                margin: 0,
                textDecoration: "line-through",
              }}
            >
              {formatNumber(props.shoe.price)}₫
            </p>
          ) : (
            <p className="card-text" style={{ color: "red", margin: 0 }}>
              {formatNumber(props.shoe.price)}₫
            </p>
          )}

          {props.shoe.salePercentage ? (
            <p className="card-text" style={{ color: "red", margin: 0 }}>
              {formatNumber(salePercentage)}₫
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
