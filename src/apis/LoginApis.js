import axios from "axios";

export const LoginUser = async (credentials) => {
  try {
    const response = await axios.post('/auth/loginuser', credentials);
    return response.data;
    } catch (error) {
    throw error;
    }
};

//logout button (remove local storage token and usert key and re derect to loging page)
export const LogoutUser = (navigate) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common.Authorization;
  navigate('/'); // Redirect to login page
};