import axios from "axios";
export const ShoeAPIs = {
  getAllShoes: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}shoes`, {
      params: {
        ...params,
      },
    });
    return response;
  },
  getShoeById: async (shoeId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}shoes/${shoeId}`
    );
    return response.data;
  },
};
