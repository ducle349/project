import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: JSON.parse(localStorage.getItem("cart")) || [],
};
const cartSlice = createSlice({
  name: "carts",
  initialState: initialState,
  reducers: {
    actAddToCart: (state, action) => {
      const exitedIndexProduct = state.carts.findIndex(
        (cart) =>
          cart.id === action.payload.id && cart.size === action.payload.size
      );

      if (exitedIndexProduct === -1) {
        const _cart = [
          ...state.carts,
          {
            ...action.payload,
            quantity: parseFloat(action.payload.quantity),
          },
        ];
        state.carts = _cart;
        localStorage.setItem("cart", JSON.stringify(_cart));
      } else {
        const _cart = [...state.carts];
        _cart[exitedIndexProduct] = {
          ..._cart[exitedIndexProduct],
          quantity:
            _cart[exitedIndexProduct].quantity + action.payload.quantity, //hoac + _cart[exitedIndexProduct].quantiny
        };

        state.carts = _cart;
        localStorage.setItem("cart", JSON.stringify(_cart));
      }
    },
    actSetCart: (state, action) => {
      state.carts = action.payload;
    },
    actDeleteCart: (state, action) => {
      const filterCart = state.carts.filter((item) => {
        return item.id !== action.payload;
      });
      state.carts = filterCart;
      localStorage.setItem("cart", JSON.stringify(filterCart));
    },
    actClearCart: (state, action) => {
      localStorage.removeItem("cart");
      state.carts = JSON.parse(localStorage.getItem("cart")) || [];
    },
    actUpdateCart: (state, action) => {
      console.log("update", action.payload);
      state.carts = state.carts.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              id: action.payload.id,
              producer: action.payload.producer,
              title: action.payload.title,
              price: action.payload.price,
              imageUrl: action.payload.imageUrl,
              size: action.payload.size,
              quantity: parseFloat(action.payload.quantity), //them quantity
              total:
                parseFloat(action.payload.quantity) *
                parseFloat(action.payload.price),
            }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(state.carts));
    },
  },
});

export const {
  actSetCart,
  setLoading,
  actAddToCart,
  actDeleteCart,
  actUpdateCart,
  actClearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
