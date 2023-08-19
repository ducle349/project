import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { actupdateUserById } from "../../redux/features/users/userSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./changepass.scss";
const schema = Yup.object().shape({
  oldpassword: Yup.string().required("Please input oldrepassword"),
  newpassword: Yup.string().required("Please input newrepassword"),
  repassword: Yup.string().required("Please input repassword"),
});
const UpdatePass = () => {
  const { userInfo, isAuth } = useSelector((state) => state.user);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      oldpassword: "",
      newpassword: "",
      repassword: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const onValid = (values) => {
    const oldpassword = userInfo.password;
    if (oldpassword !== values.oldpassword) {
      setIsValid(false);
      alert("Mật khẩu cũ không đúng");
    } else if (values.newpassword !== values.repassword) {
      setIsValid(false);
      alert("Nhập lại mật khẩu không đúng");
    } else if (isAuth) {
      setIsValid(true);
    } else {
      alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để đổi mật khẩu");
    }
    if (isValid) {
      const userchangepassword = {
        ...userInfo,
        password: values.newpassword,
      };
      dispatch(
        actupdateUserById({
          id: userInfo.id,
          usersUpdate: userchangepassword,
        })
      );
    }
  };
  return (
    <>
      <div className="form-changepass">
        <div className="image">
          <Link to={"/products?status=sale"}>
            <img
              className="image"
              src="https://myshoes.vn/image/cache/catalog/2022/banner/slide-trai-20-300x500h.png"
              alt="sale"
            ></img>
          </Link>
        </div>
        <form className="input-changepass" onSubmit={handleSubmit(onValid)}>
          <h2 style={{ textAlign: "center" }}>ĐỔI MẬT KHẨU</h2>
          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 200 }}>
              Mật khẩu cũ
            </label>
            <div>
              <Controller
                control={control}
                name="oldpassword"
                render={({ field }) => {
                  return (
                    <Input
                      type="password"
                      placeholder="Mật khẩu cũ"
                      {...field}
                    />
                  );
                }}
              />
              {!!errors.oldpassword?.message && (
                <span style={{ color: "red" }}>
                  {errors.oldpassword?.message}
                </span>
              )}
            </div>
          </div>

          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 200 }}>
              Mật khẩu mới
            </label>
            <div>
              <Controller
                control={control}
                name="newpassword"
                render={({ field }) => {
                  return (
                    <Input
                      type="password"
                      placeholder="Mật khẩu mới"
                      {...field}
                    />
                  );
                }}
              />
              {!!errors.newpassword?.message && (
                <span style={{ color: "red" }}>
                  {errors.newpassword?.message}
                </span>
              )}
            </div>
          </div>

          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 200 }}>
              Nhập lại mật khẩu mới
            </label>
            <div>
              <Controller
                control={control}
                name="repassword"
                render={({ field }) => {
                  return (
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      {...field}
                    />
                  );
                }}
              />
              {!!errors.repassword?.message && (
                <span style={{ color: "red" }}>
                  {errors.repassword?.message}
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
              Đổi mật khẩu
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
export default UpdatePass;
