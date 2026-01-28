import axios from "axios";

const API_BASE = "http://localhost:8000/api/notifications";

export const GetNotifications = async (page = 1) => {
  const response = await axios.get(`${API_BASE}?page=${page}&limit=4`);
  return response.data;
};

export const MarkNotificationAsRead = async (id) => {
  const response = await axios.patch(`${API_BASE}/${id}/view`);
  return response.data;
};

export const DeleteNotification = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};
