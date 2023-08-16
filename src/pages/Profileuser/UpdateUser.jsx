import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { actupdateUserById } from "../../redux/features/users/userSlice";
import { useState } from "react";
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
      alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để đổi mật khẩu");
    }
    if (isValid) {
      const userchangepassword = {
        ...userInfo,
        name: values.name,
        address: values.address,
        numberphone: values.numberphone,
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
      <div className="form-register">
        <form className="input-form" onSubmit={handleSubmit(onValid)}>
          <h2>ĐỔI THÔNG TIN</h2>
          <div className="input-form__item">
            <label className="input-form__label" style={{ minWidth: 200 }}>
              Họ và tên
            </label>
            <div>
              <Controller
                control={control}
                name="name"
                render={({ field }) => {
                  return <Input placeholder="Mật khẩu cũ" {...field} />;
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
                  return <Input placeholder="Mật khẩu mới" {...field} />;
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
                    <Input placeholder="Nhập lại mật khẩu mới" {...field} />
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
      </div>
    </>
  );
};
export default UpdateUser;
