import React, { useEffect } from "react";
import MainContent from "../../components/MainContent";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAccessory,
  actFetchAllShoe,
  setNewPage,
} from "../../redux/features/Shoes/shoeSlice";
import { Pagination, Spin } from "antd";
import "./style.scss";
import Accsessory from "../../components/Accessory/Accessory";

const HomePage = () => {
  const dispatch = useDispatch();
  const { isLoading, shoes, pagination, searchKey, accsessory } = useSelector(
    (state) => state.shoe
  );
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
        <MainContent shoes={shoes} />
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
