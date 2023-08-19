import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.scss";
import { useDispatch } from "react-redux";
import { actCreateUser } from "../../redux/features/users/userSlice";
import { Link } from "react-router-dom";
const schema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  numberphone: Yup.string().required("Please input numberphone"),
  address: Yup.string().required("Please input address"),
  email: Yup.string().required("Please input email"),
  password: Yup.string().required("Please input password"),
});
const Register = () => {
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      name: "",
      numberphone: "",
      address: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const onValid = (formValue) => {
    dispatch(actCreateUser(formValue));
  };

  return (
    <>
      <div className="form-register">
        <div className="image">
          <Link to={"/products?status=sale"}>
            <img
              className="image"
              src="https://myshoes.vn/image/cache/catalog/2022/banner/slide-trai-20-300x500h.png"
              alt="sale"
            ></img>
          </Link>
        </div>
        <form className="input-form" onSubmit={handleSubmit(onValid)}>
          <h2>ĐĂNG KÝ</h2>
          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 150 }}>
              Name
            </label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => {
                return <Input placeholder="Họ và Tên" {...field} />;
              }}
            />
          </div>
          {!!errors.name?.message && (
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          )}
          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 150 }}>
              Số điện thoại
            </label>
            <Controller
              control={control}
              name="numberphone"
              render={({ field }) => {
                return <Input placeholder="Số điện thoại" {...field} />;
              }}
            />
          </div>
          {!!errors.numberphone?.message && (
            <span style={{ color: "red" }}>{errors.numberphone?.message}</span>
          )}

          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 150 }}>
              Địa chỉ
            </label>
            <Controller
              control={control}
              name="address"
              render={({ field }) => {
                return <Input placeholder="Địa chỉ" {...field} />;
              }}
            />
          </div>
          {!!errors.address?.message && (
            <span style={{ color: "red" }}>{errors.address?.message}</span>
          )}

          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 150 }}>
              Email
            </label>
            <Controller
              control={control}
              name="email"
              type="email"
              render={({ field }) => {
                return <Input placeholder="Email" {...field} />;
              }}
            />
          </div>
          {!!errors.email?.message && (
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          )}

          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 150 }}>
              Password
            </label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <Input
                    type="password"
                    placeholder="Please Input..."
                    {...field}
                  />
                );
              }}
            />
          </div>
          {!!errors.password?.message && (
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          )}
          <div className=" btn-form">
            <Button className="input-form__btn" htmlType="submit">
              Đăng Ký
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
export default Register;
