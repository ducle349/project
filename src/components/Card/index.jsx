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

  return (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item"
      onClick={handleRedirectToDtailPage}
    >
      <div className="card">
        <img src={props.shoe.imageUrl} alt="img" className="card-img-top " />
        <div className="card-body">
          <p className="card-text">{props.shoe.producer}</p>
          <p className="card-title" style={{ minHeight: 75 }}>
            {" "}
            {props.shoe.title}
          </p>

          <p className="card-text" style={{ color: "red" }}>
            {formatNumber(props.shoe.price)}₫
          </p>
        </div>
      </div>
    </div>
  );
};
export default Card;
