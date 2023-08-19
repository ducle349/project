import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAPIs } from "../../../apis/UserApis";
import { Routes } from "react-router-dom";
import { globalNavigate } from "../../untils/GlobalHistory";
import { ROUTES } from "../../../constants/Routes";
import { message } from "antd";

const initialState = {
  isLoading: false,
  isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
  callbackUrl: Routes.HOME_PAGE,
  users: [],
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || [],
  errors: {},
};
export const actCreateUser = createAsyncThunk(
  "user/createNewUser",
  async (user, thunkAPI) => {
    try {
      const users = await UserAPIs.getAllUsers();
      const { email } = user;
      const foundUser = users.find((u) => u.email === email);
      if (foundUser) {
        // Nếu email đã tồn tại, trả về lỗi thông báo
        return thunkAPI.rejectWithValue("Email đã tồn tại.");
      } else {
        await UserAPIs.createUser(user);
      }
    } catch (error) {}
  }
);
export const actLogin = createAsyncThunk(
  "users/actLogin",
  async (formData, thunkAPI) => {
    const { username, password } = formData;
    try {
      const users = await UserAPIs.getAllUsers();
      const filterUser = users.find((item) => {
        return item.email === username && item.password === password;
      });
      if (filterUser) {
        return {
          userInfo: filterUser,
        };
        // thunkAPI.dispatch(loginSuccess(filterUser));
      } else throw new Error("Tài khoản hoặc mật khẩu không đúng");
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
export const actupdateUserById = createAsyncThunk(
  "users/updateUserById",
  async ({ id, usersUpdate }, thunkAPI) => {
    await UserAPIs.updateUserById(id, usersUpdate);
    thunkAPI.dispatch(actLogout());
    return null;
  }
);
export const actupdateInfoUserById = createAsyncThunk(
  "users/updateInfoUserById",
  async ({ id, usersUpdate }, thunkAPI) => {
    await UserAPIs.updateInfoUserById(id, usersUpdate);
    thunkAPI.dispatch(loginSuccess(usersUpdate));
    return null;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    actLogout: (state, _) => {
      state.isAuth = false;
      state.isLoading = false;
      state.userInfo = {};
      localStorage.setItem("isAuth", false);
      localStorage.setItem("userInfo", JSON.stringify(null));
      globalNavigate(ROUTES.LOGIN_PAGE);
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;

      state.isAuth = true;
      state.userInfo = { ...action.payload };
      localStorage.setItem("isAuth", true);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    actSetErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loginError = action.payload;
      state.isLoading = false;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      const { userInfo } = action.payload;
      state.isLoading = false;
      state.isAuth = true;
      state.userInfo = { ...userInfo };
      message.success("Đăng nhập thành công");
      localStorage.setItem("isAuth", true);
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      globalNavigate(ROUTES.HOME_PAGE);
    });
    /////////create//////////
    builder.addCase(actCreateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actCreateUser.rejected, (state, action) => {
      state.errors = {};
      message.error("Email đã tồn tại!!");
      state.isLoading = false;
    });
    builder.addCase(actCreateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      message.success("Tạo tài khoản thành công");
      globalNavigate(ROUTES.LOGIN_PAGE);
    });
    builder.addCase(actupdateUserById.fulfilled, (state, action) => {
      message.success(
        "cập nhật password thành công,Hãy đăng nhập với mật khẩu mới"
      );
      globalNavigate(ROUTES.LOGIN_PAGE);
    });
    builder.addCase(actupdateInfoUserById.fulfilled, (state, action) => {
      console.log("action", action.payload);
      message.success("cập nhật thông tin thành công");
      globalNavigate(ROUTES.HOME_PAGE);
    });
  },
});

export const { loginSuccess, actLogout, actSetErrolrs } = userSlice.actions;
export const userReducer = userSlice.reducer;
