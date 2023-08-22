import React from "react";
import "./styleOder.scss";
const Oder = (props) => {
  var date = props.createAt;
  const salePercentage = props.e.salePercentage;
  return (
    <>
      <tr>
        <td className="col1-itemoder">
          <img className="col1-itemoder-img" src={props.e.imageUrl} alt="img" />
        </td>
        <td className="col2-itemoder">
          <p> {props.e.title}</p>
          <p className="col2-layout2oder">
            {" "}
            {props.e.size >= 100 ? (
              <span>
                Size: {props.e.size}ml X {props.e.quantity}
              </span>
            ) : (
              <span>
                Size: {props.e.size} X {props.e.quantity}
              </span>
            )}
          </p>
        </td>
        <td className="col3-itemoder">{props.e.size}</td>
        <td className="col4-itemoder">{props.e.quantity}</td>
        <td className="col5-itemoder">
          {salePercentage ? (
            <span>{salePercentage}</span>
          ) : (
            <span> {props.e.price}</span>
          )}
        </td>
        <td className="col6-itemoder">{props.e.total}</td>
        <td className="col7-itemoder">{date}</td>
      </tr>
    </>
  );
};

export default Oder;
