import React from "react";
import { Select } from "antd";

import "./style.scss";
const Search = (props) => {
  const { handlesearchSize, handleSortPrice, handleDeleteFilter } = props;
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
        <div onClick={handleDeleteFilter}>Xóa tìm kiếm</div>
      </div>
    </>
  );
};

export default Search;
