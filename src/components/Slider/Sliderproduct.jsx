import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import { Link } from "react-router-dom";
import CardSale from "../Card/CardSale";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}
const Sliderproduct = (props) => {
  const { productSale } = props;
  const render = (productSale) => {
    return productSale.map((item, index) => {
      return <CardSale key={item.id} item={item} />;
    });
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="container" style={{ maxWidth: 900, textAlign: "center" }}>
      <h2> Sản phẩm giảm giá</h2>
      <Slider {...settings}>{render(productSale)}</Slider>
      <Link to={"/products?status=sale"}>
        <div style={{ marginTop: 20 }}>Xem tất cả</div>
      </Link>
    </div>
  );
};

export default Sliderproduct;
