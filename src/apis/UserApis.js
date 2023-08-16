import axios from "axios";
export const UserAPIs = {
  getAllUsers: async () => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}users`);
    return response.data;
  },
  getUserById: async (userId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}users/${userId}`
    );
    return response.data;
  },
  updateUserById: async (id, userUpdate) => {
    return await axios.patch(
      `${process.env.REACT_APP_BE_URL}users/${id}`,
      userUpdate
    );
  },
  createUser: async (user) => {
    return await axios.post(`${process.env.REACT_APP_BE_URL}users`, user);
  },
};
