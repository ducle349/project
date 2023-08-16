import React from "react";
import { Select } from "antd";

import "./style.scss";
const Search = (props) => {
  const { handlesearchSize, handleSortPrice } = props;

  const sortPrice = (value) => {
    handleSortPrice(value);
  };

  const onChangeFilterSize = (size, values) => {
    handlesearchSize(values);
  };

  return (
    <>
      <div className="search">
        <div className="search__title">
          <h4>TÌM KIẾM SẢN PHẨM</h4>
        </div>
        <div className="search__select">
          <div>GIÁ SẢN PHẨM</div>
          <Select
            className="search__select"
            style={{ fontWeight: 700 }}
            defaultValue="chọn giá"
            onChange={sortPrice}
            options={[
              { value: "Tăng Dần", label: "Giá: Tăng Dần ↑" },
              { value: "Giảm Dần", label: "Giá: Giảm Dần ↓" },
              { value: "Dưới 1.000.000đ", label: "Dưới 1.000.000đ" },
              {
                value: "1.000.000đ - 2.000.000đ",
                label: "1.000.000đ - 2.000.000đ",
              },
              {
                value: "2.000.000đ - 3.000.000đ",
                label: "2.000.000đ - 3.000.000đ",
              },
              {
                value: "Trên 3.000.000",
                label: "Trên 3.000.000",
              },
            ]}
          />
          {/* <Slider
            onChange={onChangeFilterPrice}
            range={{
              draggableTrack: true,
            }}
            defaultValue={[100000, 500000]}
            min={100000}
            max={5000000}
          /> */}
          {/* <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
            <span>Từ</span>
            <Input
              value={formatNumber(searchPrice[0]) + " ₫"}
              style={{ color: "red", width: 100 }}
            />
            <span>Đến</span>
            <Input
              value={formatNumber(searchPrice[1]) + " ₫"}
              style={{ color: "red", width: 100 }}
            />
          </div> */}
        </div>
        <div className="search__size">
          <div className="search__size__title">SIZE</div>
          <Select
            className="search__size__title"
            style={{ fontWeight: 700 }}
            defaultValue="Chọn Size"
            onChange={onChangeFilterSize}
            options={[
              { value: 39, label: 39, type: "size" },
              { value: 40, label: 40, type: "size" },
              { value: 41, label: 41, type: "size" },
              { value: 42, label: 42, type: "size" },
              { value: 43, label: 43, type: "size" },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
