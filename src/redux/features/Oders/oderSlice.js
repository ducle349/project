import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OderAPIs } from "../../../apis/OdersApis";
import { message } from "antd";
import { globalNavigate } from "../../untils/GlobalHistory";
import { ROUTES } from "../../../constants/Routes";

const initialState = {
  isLoading: false,
  oders: [],
  errors: {},
  pagination: {
    currentPage: 1,
    limitPerPage: 8,
    total: 8,
  },
};
export const actFetchAllOder = createAsyncThunk(
  "oders/fetchAllOder",
  async () => {
    const response = await OderAPIs.getAllOders();
    return response.data;
  }
);

const oderSlice = createSlice({
  name: "oder",
  initialState: initialState,
  reducers: {
    actSetShoes: (state, action) => {
      state.oders = action.payload;
    },
    actSetErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllOder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllOder.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllOder.fulfilled, (state, action) => {
      state.oders = action.payload;

      state.isLoading = false;
    });
  },
});
export const actCreateNewOder = (oder) => {
  return async (dispatch) => {
    try {
      await OderAPIs.createOder(oder);
      message.success("mua hang thanh cong");
      globalNavigate(ROUTES.ODER_PAGE);
    } catch (error) {}
  };
};
export const { actSetShoes } = oderSlice.actions;
export const oderReducer = oderSlice.reducer;
