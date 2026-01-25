import axios from "axios";

export const LoginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/loginuser', credentials);
    return response.data;
    } catch (error) {
    throw error;
    }
};