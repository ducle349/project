import React from "react";
import "./style.scss";

import Card from "../Card";

const MainContent = (props) => {
  const renderShoe = (shoes) => {
    return shoes.map((shoe) => {
      return <Card key={shoe.id} shoe={shoe} />;
    });
  };
  return (
    <>
      <div className="main">
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

        <div className="product">
          <div className="container">
            <div className="row">
              <div className="title">Sản Phẩm Giày Chính Hãng</div>
              {renderShoe(props.shoes)}
            </div>
            {/* <div className="row">
              <div className="title">Phụ Kiện</div>
              {renderAccessory(props.shoes)}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
