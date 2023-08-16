import React from "react";
import Card from "../Card";

const Accsessory = (props) => {
  const renderShoe = (accsessory) => {
    return accsessory.map((shoe) => {
      return <Card key={shoe.id} shoe={shoe} />;
    });
  };
  return (
    <>
      <div className="product">
        <div className="container">
          <div className="row">
            <div className="title">Phụ Kiện Vệ Sinh Giày</div>
            {renderShoe(props.accsessory)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accsessory;
