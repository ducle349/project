import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShoeAPIs } from "../../../apis/ShoesApis";
const initialState = {
  isLoading: false,
  shoes: [],
  accsessory: [],
  productSale: [],
  currentShoe: [],
  errors: {},
  pagination: {
    currentPage: 1,
    limitPerPage: 8,
    total: 8,
  },
  searchKey: "",
  params: {
    _sort: null,
    _order: null,
    brand: null,
    q: null,
    price_lte: null,
    price_gte: null,
  },
};
export const actFetchAllShoe = createAsyncThunk(
  "shoes/fetchAllShoe",
  async (params = {}) => {
    const response = await ShoeAPIs.getAllShoes({
      _sort: "createAt",
      _order: "desc",
      ...params,
    });
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);
export const actFetchShoeById = createAsyncThunk(
  "shoes/fetchShoeById",
  async (shoeId) => {
    const shoe = await ShoeAPIs.getShoeById(shoeId);
    return shoe;
  }
);
export const actFetchAccessory = createAsyncThunk(
  "Accessory/actFetchAccessory",
  async () => {
    const response = await ShoeAPIs.getAllShoes({ producer: "mycare" });
    return response.data;
  }
);
export const actFetchSale = createAsyncThunk(
  "productSale/actFetchSale",
  async () => {
    const response = await ShoeAPIs.getAllShoes({ status: "sale" });
    return response.data;
  }
);
const shoeSlice = createSlice({
  name: "shoes",
  initialState: initialState,
  reducers: {
    actSetShoes: (state, action) => {
      state.shoes = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    actSetErrors: (state, action) => {
      state.errors = action.payload;
    },
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    fiterProduct: (state, action) => {
      if (action.payload.type === "size") {
        state.params.size_like = action.payload.value;
      }
      if (action.payload === "Tăng Dần" || action.payload === "Giảm Dần") {
        state.params._sort = "price";
        state.params._order = action.payload === "Tăng Dần" ? "asc" : "desc";
      }
      if (action.payload === "Dưới 1.000.000đ") {
        state.params.price_lte = 1000000;
        state.params.price_gte = 0;
      }
      if (action.payload === "1.000.000đ - 2.000.000đ") {
        state.params.price_gte = 1000000;
        state.params.price_lte = 2000000;
      }
      if (action.payload === "2.000.000đ - 3.000.000đ") {
        state.params.price_gte = 2000000;
        state.params.price_lte = 3000000;
      }
      if (action.payload === "Trên 3.000.000") {
        state.params.price_gte = 3000000;
        state.params.price_lte = 5000000;
      }
    },
    deleteFilter: (state, action) => {
      state.params = {
        _sort: null,
        _order: null,
        brand: null,
        q: null,
        price_lte: null,
        price_gte: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllShoe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllShoe.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllShoe.fulfilled, (state, action) => {
      state.shoes = action.payload.data;
      state.isLoading = false;
      state.pagination.total = action.payload.total;
    });
    builder.addCase(actFetchShoeById.fulfilled, (state, action) => {
      state.currentShoe = action.payload;
      state.isLoading = false;
    });
    builder.addCase(actFetchAccessory.fulfilled, (state, action) => {
      state.accsessory = action.payload;
      state.isLoading = false;
    });
    builder.addCase(actFetchSale.fulfilled, (state, action) => {
      state.productSale = action.payload;
      state.isLoading = false;
    });
  },
});

export const {
  actSetShoes,
  actSetErrors,
  setNewPage,
  setSearchKey,
  fiterProduct,
  deleteFilter,
} = shoeSlice.actions;
export const shoeReducer = shoeSlice.reducer;
