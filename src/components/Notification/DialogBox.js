import React from "react";

/**
 * @typedef {Object} Notification
 * @property {string} _id
 * @property {string} subject
 * @property {string} message
 * @property {"INFO"|"WARNING"|"SUCCESS"|"ERROR"} type
 * @property {boolean} viewed
 * @property {string} [createdAt]
 */

/**
 * @param {{ notification: Notification, onView: (id:string)=>void, onDelete: (id:string)=>void }} props
 */
export default function DialogBox({ notification, onView, onDelete }) {
  const {
    _id,
    subject,
    message,
    type = "INFO",
    viewed,
    createdAt,
  } = notification;

  const typeStyles = {
    INFO: "bg-blue-100 text-blue-700",
    SUCCESS: "bg-green-100 text-green-700",
    WARNING: "bg-yellow-100 text-yellow-700",
    ERROR: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-3 flex justify-between items-start
      shadow-sm transition
      ${
        viewed
          ? "bg-gray-50 dark:bg-[#202022]"
          : "bg-white dark:bg-[#19191A] border-l-4 border-l-blue-500"
      }`}
    >
      {/* Left */}
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-base">{subject}</h3>

          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              typeStyles[type]
            }`}
          >
            {type}
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

      {/* Right */}
      <div className="flex flex-col gap-2">
        {!viewed && (
          <button
            onClick={() => onView(_id)}
            className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            View
          </button>
        )}

        <button
          onClick={() => onDelete(_id)}
          className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
