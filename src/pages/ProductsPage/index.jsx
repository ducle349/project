import React, { useEffect } from "react";
import Search from "../../components/Search";

import "./style.scss";
// import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllShoe,
  fiterProduct,
  setNewPage,
} from "../../redux/features/Shoes/shoeSlice";
import MainContent from "../../components/MainContent";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
// import Card from "../../components/Card";
// import { Pagination } from "antd";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const dispatch = useDispatch();
  const { pagination, searchKey, params, shoes } = useSelector(
    (state) => state.shoe
  );
  useEffect(() => {
    dispatch(
      actFetchAllShoe({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...params,
        producer: brand,
      })
    );

    return () => {
      dispatch(setNewPage(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, brand]);
  useEffect(() => {}, [searchParams]);
  const handleChangePage = (newPage) => {
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllShoe({
        _page: newPage,
        _limit: pagination.limitPerPage,
        q: searchKey,
        producer: brand,
      })
    );
  };

  const handlesearchSize = (searchSize) => {
    dispatch(fiterProduct(searchSize));
  };
  const handleSortPrice = (valueSort) => {
    dispatch(fiterProduct(valueSort));
  };
  return (
    <>
      <div className="producs-body">
        <div className="producs-body__search">
          <Search
            handlesearchSize={handlesearchSize}
            handleSortPrice={handleSortPrice}
          />
          ;
        </div>
        <div className="producs-body__product">
          <div className="container">
            <div className="row">
              <div className="title">Giày hiệu chính hãng</div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
