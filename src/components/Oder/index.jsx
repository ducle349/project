import React from "react";

const Oder = (props) => {
  var date = props.createAt;
  const salePercentage = props.e.salePercentage;
  return (
    <>
      <tr>
        <td>
          <img src={props.e.imageUrl} alt="img" style={{ width: 100 }} />
        </td>
        <td>{props.e.title}</td>
        <td>{props.e.size}</td>
        <td>{props.e.quantity}</td>
        <td>
          {salePercentage ? (
            <span>{salePercentage}</span>
          ) : (
            <span> {props.e.price}</span>
          )}
        </td>
        <td>{props.e.total}</td>
        <td>{date}</td>
      </tr>
    </>
  );
};

export default Oder;
