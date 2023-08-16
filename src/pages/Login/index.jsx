import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import "./style.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import { useDispatch, useSelector } from "react-redux";
import { actLogin } from "../../redux/features/users/userSlice";
import { useEffect } from "react";
const schema = Yup.object().shape({
  username: Yup.string().required("Please input name"),
  password: Yup.string().required("Please input password"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, isLoading, loginError, callbackUrl } = useSelector(
    (state) => state.user
  );
  const methods = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const onValid = (values) => {
    dispatch(actLogin(values));
  };

  useEffect(() => {
    if (isAuth) {
      navigate(callbackUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  return (
    <>
      <div className="form-login">
        <div className="register">
          <div className="register-content">
            <h2>KHÁCH HÀNG MỚI</h2>
            <p>
              Bằng cách tạo tài khoản bạn sẽ có thể mua sắm nhanh hơn và nhiều
              chương trình mua sắm ưu đãi hơn dành riêng cho khách hàng thân
              thiết.
            </p>
          </div>
          <Link to={ROUTES.REGISTER_PAGE}>
            <Button className="input-form__btn">Đăng Ký</Button>
          </Link>
        </div>
        <div className="login">
          {!!loginError && <span className="text-error">{loginError}</span>}
          <form className="input-form" onSubmit={handleSubmit(onValid)}>
            <div className="input-login">
              <h2>ĐĂNG NHẬP</h2>
              <div className="input-form__item">
                <label className="input-form__label" style={{ minWidth: 100 }}>
                  UserName:
                </label>
                <Controller
                  control={control}
                  name="username"
                  type="email"
                  render={({ field }) => {
                    return <Input placeholder="email" {...field} />;
                  }}
                />
              </div>
              {!!errors.username?.message && (
                <span style={{ color: "red" }}>{errors.username?.message}</span>
              )}
              <div className="input-form__item">
                <label className="input-form__label" style={{ minWidth: 100 }}>
                  Password:
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
            </div>
            <div className=" btn-form">
              <Button
                className="input-form__btn"
                htmlType="submit"
                disabled={isLoading}
              >
                Đăng Nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
