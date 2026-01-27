import React, { useState } from "react";
import DialogBox from "../../components/Notification/DialogBox";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      _id: "1",
      subject: "Low Stock Alert",
      message: "Product ABC is running low.",
      type: "WARNING",
      viewed: false,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      subject: "Order Completed",
      message: "Order #123 has been successfully delivered.",
      type: "SUCCESS",
      viewed: true,
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleView = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, viewed: true } : n
      )
    );

    // TODO: API call
    // PATCH /api/notifications/:id/view
  };

  const handleDelete = (id) => {
    setNotifications((prev) =>
      prev.filter((n) => n._id !== id)
    );

    // TODO: API call
    // DELETE /api/notifications/:id
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
      <h2 className="text-xl font-semibold mb-1">Notifications</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        View and manage your notifications
      </p>

      <div className="max-w-xl mx-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">
            No notifications available
          </p>
        ) : (
          notifications.map((n) => (
            <DialogBox
              key={n._id}
              notification={n}
              onView={handleView}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
