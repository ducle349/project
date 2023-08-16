import axios from "axios";
export const cartsAPIs = {
  getAllCarts: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}carts`, {
      params: params,
    });
    return response;
  },
  getCartById: async (cartId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}carts/${cartId}`
    );
    return response.data;
  },
  createCart: async (cart) => {
    return await axios.post(`${process.env.REACT_APP_BE_URL}carts`, cart);
  },
  deleteCartById: async (id) => {
    return await axios.delete(`${process.env.REACT_APP_BE_URL}carts/${id}`);
  },
};
