import React, { useEffect } from "react";
import MainContent from "../../components/MainContent";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAccessory,
  actFetchAllShoe,
  actFetchSale,
  setNewPage,
} from "../../redux/features/Shoes/shoeSlice";
import { Pagination, Spin } from "antd";
import "./style.scss";
import Accsessory from "../../components/Accessory/Accessory";

import Sliderproduct from "../../components/Slider/Sliderproduct";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isLoading, shoes, pagination, searchKey, accsessory, productSale } =
    useSelector((state) => state.shoe);
  useEffect(() => {
    dispatch(
      actFetchAllShoe({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(actFetchAccessory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(actFetchSale());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangePage = (newPage) => {
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllShoe({
        _page: newPage,
        _limit: pagination.limitPerPage,
        q: searchKey,
      })
    );
  };

  if (isLoading) {
    return <Spin />;
  }
  return (
    <>
      <div className="home">
        <div className="Sale-layout">
          <div className="image">
            <Link to={"/products?status=sale"}>
              <img
                className="image"
                src="https://myshoes.vn/image/cache/catalog/2022/banner/slide-trai-20-300x500h.png"
                alt="sale"
              ></img>
            </Link>
          </div>
          <Sliderproduct productSale={productSale} />
          <div className="image">
            <Link to={"/products?status=sale"}>
              <img
                className="image"
                src="https://myshoes.vn/image/cache/catalog/2023/banner/banner-sale-side-240x390.png"
                alt="sale"
              ></img>
            </Link>
          </div>
        </div>
        {shoes.length > 0 ? (
          <MainContent shoes={shoes} />
        ) : (
          <h2
            style={{
              textAlign: "center",
              color: "red",
              paddingTop: 50,
            }}
          >
            Không có sản phẩm phù hợp{" "}
          </h2>
        )}
        <div className="pagination">
          <Pagination
            defaultPageSize={pagination.limitPerPage}
            current={pagination.currentPage}
            total={pagination.total}
            onChange={handleChangePage}
          />
        </div>
        <Accsessory accsessory={accsessory} />
      </div>
    </>
  );
};

export default HomePage;
