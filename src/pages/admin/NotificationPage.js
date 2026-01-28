import React, { useEffect, useState } from "react";
import DialogBox from "../../components/Notification/DialogBox";
import {
  GetNotifications,
  MarkNotificationAsRead,
  DeleteNotification,
} from "../../../src/apis/NotificationAPI";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  const fetchNotifications = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await GetNotifications(pageNumber);

      setNotifications(Array.isArray(response.data) ? response.data : []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Fetch notifications failed:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      await MarkNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, viewed: true } : n
        )
      );
    } catch (error) {
      console.error("Mark as read failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DeleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-[#19191A]">
      <h2 className="text-xl font-semibold mb-5">Notifications</h2>
  
      <div className="max-w-6xl mx-auto">
        {(() => {
          if (loading) {
            return <p className="text-center">Loading...</p>;
          }
          if (notifications.length === 0) {
            return (
              <p className="text-center text-gray-500">
                No notifications available
              </p>
            );
          }
          return notifications.map((n) => (
            <DialogBox
              key={n._id}
              notification={n}
              onView={handleView}
              onDelete={handleDelete}
            />
          ));
        })()}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-1 rounded bg-gray-700 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-1 rounded bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
