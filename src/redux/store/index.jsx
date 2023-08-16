import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../features/users/userSlice";
import { shoeReducer } from "../features/Shoes/shoeSlice";
import { cartReducer } from "../features/Carts/cartSlice";
import { oderReducer } from "../features/Oders/oderSlice";
import { commentReducer } from "../features/Comments/CommentsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shoe: shoeReducer,
    cart: cartReducer,
    oder: oderReducer,
    comment: commentReducer,
  },
});
