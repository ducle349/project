import axios from "axios";
export const OderAPIs = {
  getAllOders: async () => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}oders`);
    return response;
  },
  getOderById: async (oderId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}oders/${oderId}`
    );
    return response.data;
  },
  createOder: async (oder) => {
    return await axios.post(`${process.env.REACT_APP_BE_URL}oders`, oder);
  },
};
