import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiX, FiEye } from "react-icons/fi";
import ButtonCompo from "../button/ButtonCompo";

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

function formatCellValue(value) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function ToggleSwitch({ checked, onChange, disabled = false }) {
  return (
    <label
      className={`inline-flex items-center ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      title={checked ? "On" : "Off"}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={Boolean(checked)}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <div className="relative h-6 transition-colors rounded-full shadow-inner w-11 bg-slate-300 peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:bg-slate-700 dark:peer-focus-visible:ring-offset-slate-950">
        <div className="absolute left-0.5 top-0.5 h-5 w-5 translate-x-0 rounded-full border border-slate-200 bg-white shadow-sm transition-transform peer-checked:translate-x-5 dark:border-slate-800" />
      </div>
    </label>
  );
}

function DefaultEmpty({ colSpan }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-4 py-10 text-sm text-center text-slate-500 dark:text-slate-400"
      >
        No data to display
      </td>
    </tr>
  );
}
//view popup modal
function ViewModal({ open, title, row, columns, onClose }) {
  const [expandedImage, setExpandedImage] = useState(null);
  if (!open || !row) return null;

  // Helper to detect image URLs
  const isImageUrl = (str) => {
    try {
      if (!str || typeof str !== "string") return false;
      const lower = str.toLowerCase();
      return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(lower);
    } catch {
      return false;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-950">
          {/* Header Section */}
          <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  View record details
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center w-10 h-10 border rounded-lg border-slate-300 text-slate-600 hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {columns.map((col) => {
                const raw = row?.[col.key];
                const isImage = col.type === "image" || isImageUrl(raw);
                if (isImage) {
                  return (
                    <div key={col.key} className="sm:col-span-2">
                      <p className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                        {col.header}
                      </p>
                      {raw && isImageUrl(raw) ? (
                        <div
                          className="relative w-full mb-2 overflow-hidden transition-shadow bg-white border rounded-lg cursor-pointer border-slate-200 dark:border-slate-700 hover:shadow-lg group"
                          onClick={() => setExpandedImage(raw)}
                        >
                          <img
                            src={raw}
                            alt={col.header}
                            className="object-cover w-full h-48"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='12' fill='%239ca3af' text-anchor='middle' dy='.3em'%3EImage Error%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center transition-colors bg-black/0 group-hover:bg-black/20">
                            <span className="text-sm font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Click to expand</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">No image</span>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <div key={col.key} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
                    <p className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                      {col.header}
                    </p>
                    <p className="text-sm font-medium break-words text-slate-900 dark:text-slate-100">
                      {typeof col.render === "function"
                        ? col.render(raw, row)
                        : formatCellValue(raw)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-end px-6 py-4 border-t bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <ButtonCompo
              variant="blue"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Close
            </ButtonCompo>
          </div>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60">
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="absolute right-0 inline-flex items-center justify-center w-10 h-10 text-white transition rounded-lg -top-10 hover:bg-white/10"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
            <img
              src={expandedImage}
              alt="Expanded view"
              className="w-full h-auto rounded-lg shadow-2xl max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

//delete confirmation modal
function DeleteModal({ open, title, row, onClose, onConfirm }) {
  if (!open || !row) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md p-5 bg-white shadow-2xl rounded-2xl dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Are you sure you want to delete this record? This action cannot be undone.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center border rounded-md h-9 w-9 border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>
        <div className="flex flex-col-reverse gap-2 mt-6 sm:flex-row sm:justify-end">
          <ButtonCompo
            variant="blue"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </ButtonCompo>
          <ButtonCompo
            variant="red"
            onClick={() => {
              onConfirm(row);
            }}
            className="w-full sm:w-auto"
          >
            Delete
          </ButtonCompo>
        </div>
      </div>
    </div>
  );
}



//edit popup modal

function EditModal({ open, title, row, fields, onClose, onSave }) {
  const [draft, setDraft] = useState(row || {});
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    setDraft(row || {});
  }, [row]);

  if (!open) return null;

  const isImageUrl = (str) => {
    try {
      if (!str || typeof str !== "string") return false;
      const lower = str.toLowerCase();
      return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(lower);
    } catch {
      return false;
    }
  };

  const update = (key, value) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    for (const field of fields) {
      if (field.required) {
        const value = draft[field.key];
        const missing =
          value === null || value === undefined || String(value).trim() === "";
        if (missing) {
          toast.error(`${field.label} is required`);
          return;
        }
      }

      if (
        field.type === "number" &&
        draft[field.key] !== "" &&
        draft[field.key] !== null &&
        draft[field.key] !== undefined
      ) {
        const num = Number(draft[field.key]);
        if (Number.isNaN(num)) {
          toast.error(`${field.label} must be a number`);
          return;
        }
      }
    }

    const next = { ...draft };
    for (const field of fields) {
      if (
        field.type === "number" &&
        next[field.key] !== "" &&
        next[field.key] !== null &&
        next[field.key] !== undefined
      ) {
        next[field.key] = Number(next[field.key]);
      }
      if (field.type === "checkbox") {
        next[field.key] = Boolean(next[field.key]);
      }
    }
    onSave(next);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-950">
          {/* Header Section */}
          <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Update details and save changes
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center w-10 h-10 border rounded-lg border-slate-300 text-slate-600 hover:bg-white dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((field) => {
                const key = field.key;
                const label = field.label;
                const isImage = field.type === "image" || isImageUrl(draft[key]);

                if (isImage) {
                  return (
                    <label key={key} className="block sm:col-span-2">
                      <span className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {label}
                        {field.required && <span className="ml-1 text-red-500">*</span>}
                      </span>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 text-sm bg-white border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 mb-3"
                        value={draft[key] ?? ""}
                        onChange={(e) => update(key, e.target.value)}
                        placeholder="Enter image URL..."
                      />
                      {draft[key] && isImageUrl(draft[key]) && (
                        <div
                          className="relative w-full overflow-hidden transition-shadow bg-white border rounded-lg cursor-pointer border-slate-200 dark:border-slate-700 hover:shadow-lg group"
                          onClick={() => setExpandedImage(draft[key])}
                        >
                          <img
                            src={draft[key]}
                            alt={label}
                            className="object-cover w-full h-48"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='12' fill='%239ca3af' text-anchor='middle' dy='.3em'%3EImage Error%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center transition-colors bg-black/0 group-hover:bg-black/20">
                            <span className="text-sm font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">Click to expand</span>
                          </div>
                        </div>
                      )}
                    </label>
                  );
                }

                if (field.type === "checkbox") {
                  return (
                    <label
                      key={key}
                      className="inline-flex items-center gap-3 p-3 border rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 sm:col-span-2"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(draft[key])}
                        onChange={(e) => update(key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
                      />
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</span>
                    </label>
                  );
                }

                if (field.type === "select") {
                  return (
                    <label key={key} className="block">
                      <span className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
                      <select
                        className="w-full px-4 py-2.5 text-sm bg-white border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        value={draft[key] ?? ""}
                        onChange={(e) => update(key, e.target.value)}
                      >
                        <option value="">Select {label.toLowerCase()}</option>
                        {(field.options || []).map((opt) => (
                          <option key={String(opt.value)} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                const inputType = field.type === "number" ? "number" : "text";
                return (
                  <label key={key} className="block">
                    <span className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {label}
                      {field.required && <span className="ml-1 text-red-500">*</span>}
                    </span>
                    <input
                      type={inputType}
                      className="w-full px-4 py-2.5 text-sm bg-white border rounded-lg outline-none border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      value={draft[key] ?? ""}
                      onChange={(e) => update(key, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col-reverse gap-3 px-6 py-4 border-t bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 sm:flex-row sm:justify-end">
            <ButtonCompo
              variant="red"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </ButtonCompo>
            <ButtonCompo
              variant="green"
              onClick={handleSave}
              className="w-full sm:w-auto"
            >
              Save changes
            </ButtonCompo>
          </div>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60">
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="absolute right-0 inline-flex items-center justify-center w-10 h-10 text-white transition rounded-lg -top-10 hover:bg-white/10"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
            <img
              src={expandedImage}
              alt="Expanded view"
              className="w-full h-auto rounded-lg shadow-2xl max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Reusable table component
 * - Pass `rows` and `columns` for any table
 * - Optional `onEdit`/`onDelete` for action buttons
 * - Optional `editFields` to enable built-in edit modal
 */
export default function TabelCompo({
  title = "Table",
  rows: rowsProp = [],
  columns = [],
  getRowId,
  onView,
  onEdit,
  onDelete,
  editFields,
  editTitle = "Edit",
}) {
  const isControlled = Array.isArray(rowsProp);
  const [rows, setRows] = useState(isControlled ? rowsProp : []);
  const [editingRow, setEditingRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewingRow, setViewingRow] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deletingRow, setDeletingRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isControlled) setRows(rowsProp);
  }, [isControlled, rowsProp]);

  const resolveRowId = useMemo(() => {
    if (typeof getRowId === "function") return getRowId;
    return (row) => row?.id ?? row?._id;
  }, [getRowId]);

  const tableRows = useMemo(() => rows || [], [rows]);
  const showActions =
    typeof onEdit === "function" ||
    typeof onDelete === "function" ||
    typeof onView === "function" ||
    Array.isArray(editFields);

const handleViewClick = (row) => {
  setViewingRow(row);
  setViewModalOpen(true);
  if (typeof onView === "function") onView(row);
};

  const handleEditClick = (row) => {
    if (Array.isArray(editFields) && editFields.length > 0) {
      setEditingRow(row);
      setModalOpen(true);
      return;
    }
    if (typeof onEdit === "function") onEdit(row);
  };

  const handleDeleteClick = (row) => {
    setDeletingRow(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = (row) => {
    if (typeof onDelete === "function") {
      onDelete(row);
    } else {
      setRows((prev) =>
        prev.filter((r) => resolveRowId(r) !== resolveRowId(row)),
      );
      toast.success("Deleted");
    }
    setDeleteModalOpen(false);
    setDeletingRow(null);
  };

  const handleSaveEdit = (updatedRow) => {
    if (typeof onEdit === "function") {
      onEdit(updatedRow);
    } else {
      setRows((prev) =>
        prev.map((r) =>
          resolveRowId(r) === resolveRowId(updatedRow) ? updatedRow : r,
        ),
      );
      toast.success("Updated");
    }
    setModalOpen(false);
    setEditingRow(null);
  };

  return (
    <div className="mt-8">
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Total: {tableRows.length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
        <div className="overflow-x-auto text-start">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-[#2A2A2C]">
            <thead className="bg-slate-50 dark:bg-[#202022]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300 ${col.align === "right" ? "text-right" : ""}`}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.header}
                  </th>
                ))}
                {showActions && (
                  <th className="px-4 py-3 text-xs font-semibold tracking-wide text-right uppercase text-slate-600 dark:text-slate-300">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-[#2A2A2C]">
              {tableRows.length === 0 ? (
                <DefaultEmpty
                  colSpan={columns.length + (showActions ? 1 : 0)}
                />
              ) : (
                tableRows.map((row) => (
                  <tr
                    key={resolveRowId(row)}
                    className="hover:bg-slate-50/60 dark:hover:bg-[#232325]"
                  >
                    {columns.map((col) => {
                      const raw = row?.[col.key];
                      const content =
                        typeof col.render === "function"
                          ? col.render(raw, row)
                          : formatCellValue(raw);
                      return (
                        <td
                          key={col.key}
                          className={`px-4 py-3 text-sm ${col.align === "right" ? "text-right" : ""} ${col.muted ? "text-slate-600 dark:text-slate-300" : ""}`}
                        >
                          {content}
                        </td>
                      );
                    })}
                    {showActions && (
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          {typeof onView === "function" && (
                            <ButtonCompo
                              variant="blue"
                              size="sm"
                              onClick={() => handleViewClick(row)}
                              icon={<FiEye />}
                            >
                              View
                            </ButtonCompo>
                          )}
                          {typeof onEdit === "function" && (
                            <ButtonCompo
                              variant="green"
                              size="sm"
                              onClick={() => handleEditClick(row)}
                              icon={<FiEdit2 />}
                            >
                              Edit
                            </ButtonCompo>
                          )}

                          {typeof onDelete === "function" && (
                            <ButtonCompo
                              variant="red"
                              size="sm"
                              onClick={() => handleDeleteClick(row)}
                              icon={<FiTrash2 />}
                            >
                              Delete
                            </ButtonCompo>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditModal
        open={modalOpen}
        title={editTitle}
        row={editingRow}
        fields={editFields || []}
        onClose={() => {
          setModalOpen(false);
          setEditingRow(null);
        }}
        onSave={handleSaveEdit}
      />

      <ViewModal
        open={viewModalOpen}
        title="View Record"
        row={viewingRow}
        columns={columns}
        onClose={() => {
          setViewModalOpen(false);
          setViewingRow(null);
        }}
      />

      <DeleteModal
        open={deleteModalOpen}
        title="Delete Record"
        row={deletingRow}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingRow(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

TabelCompo.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.array,
  columns: PropTypes.array,
  getRowId: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  editFields: PropTypes.array,
  editTitle: PropTypes.string,
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

// Helpers you can use in column renderers
export const TableFormat = {
  formatDateTime,
};

export const TableWidgets = {
  ToggleSwitch,
};
