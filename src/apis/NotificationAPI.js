import React from "react";
import axios from "axios";

export const SendNotification = async (notificationData) => {
  try {
    const response = await axios.post(`/api/notifications`, notificationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetNotifications = async (page, limit) => {
  try {
    const response = await axios.get(
      `/api/notifications?page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const MarkNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.patch(
      `/api/notifications/${notificationId}/view`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteNotification = async (notificationId) => {
  try {
    const response = await axios.delete(`/api/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
