import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { actupdateInfoUserById } from "../../redux/features/users/userSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./formupdateuser.scss";
const schema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  address: Yup.string().required("Please input address"),
  numberphone: Yup.string().required("Please input numberphone"),
});
const UpdateUser = () => {
  const { userInfo, isAuth } = useSelector((state) => state.user);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      name: "",
      address: "",
      numberphone: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const onValid = (values) => {
    if (isAuth) {
      setIsValid(true);
    } else {
      alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để đổi thông tin");
    }
    if (isValid) {
      const userchangeInfo = {
        ...userInfo,
        name: values.name,
        address: values.address,
        numberphone: values.numberphone,
      };

      dispatch(
        actupdateInfoUserById({
          id: userInfo.id,
          usersUpdate: userchangeInfo,
        })
      );
    }
  };
  return (
    <>
      <div className="form-updateuser">
        <div className="image">
          <Link to={"/products?status=sale"}>
            <img
              className="image"
              src="https://myshoes.vn/image/cache/catalog/2022/banner/slide-trai-20-300x500h.png"
              alt="sale"
            ></img>
          </Link>
        </div>
        <form className="input-updateuser" onSubmit={handleSubmit(onValid)}>
          <h2 style={{ textAlign: "center" }}>ĐỔI THÔNG TIN</h2>
          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 200 }}>
              Họ và tên
            </label>
            <div>
              <Controller
                control={control}
                name="name"
                render={({ field }) => {
                  return <Input placeholder="Nhập tên của bạn" {...field} />;
                }}
              />
              {!!errors.name?.message && (
                <span style={{ color: "red" }}>{errors.name?.message}</span>
              )}
            </div>
          </div>

          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 200 }}>
              Địa chỉ
            </label>
            <div>
              <Controller
                control={control}
                name="address"
                render={({ field }) => {
                  return (
                    <Input placeholder="Nhập địa chỉ của bạn" {...field} />
                  );
                }}
              />
              {!!errors.address?.message && (
                <span style={{ color: "red" }}>{errors.address?.message}</span>
              )}
            </div>
          </div>

          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 200 }}>
              Số điện thoại
            </label>
            <div>
              <Controller
                control={control}
                name="numberphone"
                render={({ field }) => {
                  return (
                    <Input
                      placeholder="Nhập số điện thoại của bạn"
                      {...field}
                    />
                  );
                }}
              />
              {!!errors.numberphone?.message && (
                <span style={{ color: "red" }}>
                  {errors.numberphone?.message}
                </span>
              )}
            </div>
          </div>

          <div className=" btn-form">
            <Button
              className="input-form__btn"
              style={{ padding: 5 }}
              htmlType="submit"
            >
              Đổi thông tin
            </Button>
          </div>
        </form>
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
    </>
  );
};
export default UpdateUser;
