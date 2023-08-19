import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { ROUTES } from "./constants/Routes";
import HomePage from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DetailsPage from "./pages/ProducDetailsPage";
import ShoppingCart from "./pages/ShoppingCart";
import ProfileUser from "./pages/Profileuser";
import ProductsPage from "./pages/ProductsPage";
import { GlobalHistory } from "./redux/untils/GlobalHistory";
import Oders from "./pages/Oders";
import ProfileLayout from "./layout/ProfileLayout";
import UpdatePass from "./pages/Profileuser/changePass";
import InfoUser from "./pages/Profileuser/InfoUser";
import UpdateUser from "./pages/Profileuser/UpdateUser";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalHistory />
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
            <Route path={ROUTES.PRODUCTS_PAGE} element={<ProductsPage />} />
            <Route path={ROUTES.LOGIN_PAGE} element={<Login />} />
            <Route path={ROUTES.REGISTER_PAGE} element={<Register />} />
            <Route path={ROUTES.DETAILS_PAGE} element={<DetailsPage />} />
            <Route path={ROUTES.CARTS_PAGE} element={<ShoppingCart />} />
            <Route path={ROUTES.PROFILEUSER_PAGE} element={<ProfileUser />} />
          </Route>
          <Route
            path={"/"}
            element={<Navigate to={ROUTES.HOME_PAGE}> </Navigate>}
          />
        </Routes>
        <Routes>
          <Route element={<ProfileLayout />}>
            <Route path={ROUTES.ODER_PAGE} element={<Oders />} />
            <Route path={ROUTES.UPDATEPASS_PAGE} element={<UpdatePass />} />
            <Route path={ROUTES.INFORUSER_PAGE} element={<InfoUser />} />
            <Route path={ROUTES.UPDATEUSER_PAGE} element={<UpdateUser />} />
          </Route>
          <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
