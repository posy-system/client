import React, { useState } from "react";
import PropTypes from "prop-types";

export default function DialogBox({ notification, onView, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!notification) return null;

  const {
    _id,
    subject = "No subject",
    message = "",
    type = "INFO",
    viewed = false,
    createdAt,
  } = notification;

  const safeType = ["INFO", "SUCCESS", "WARNING", "ERROR"].includes(type)
    ? type
    : "INFO";

  const typeStyles = {
    INFO: "bg-blue-100 text-blue-700",
    SUCCESS: "bg-green-100 text-green-700",
    WARNING: "bg-yellow-100 text-yellow-700",
    ERROR: "bg-red-100 text-red-700",
  };

  const handleConfirmDelete = () => {
    onDelete(_id);
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className={`border rounded-lg p-4 mb-6 flex justify-between items-start shadow-sm
          ${
            viewed
              ? "bg-gray-50 dark:bg-[#202022]"
              : "bg-white dark:bg-[#19191A] border-l-4 border-l-blue-500"
          }`}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold">{subject}</h3>

            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                typeStyles[safeType]
              }`}
            >
              {safeType}
            </span>

            {!viewed && (
              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {message}
          </p>

          {createdAt && (
            <p className="text-xs text-gray-400">
              {new Date(createdAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {!viewed && (
            <button
              onClick={() => onView(_id)}
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
            >
              View
            </button>
          )}

          <button
            onClick={() => setShowConfirm(true)}
            className="px-3 py-1 text-sm rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1e1e1f] rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete this notification?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1.5 text-sm rounded bg-gray-300 dark:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 text-sm rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

DialogBox.propTypes = {
  notification: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subject: PropTypes.string,
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
    viewed: PropTypes.bool,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onView: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
