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
      <div className="relative h-6 w-11 rounded-full bg-slate-300 shadow-inner transition-colors peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white dark:bg-slate-700 dark:peer-focus-visible:ring-offset-slate-950">
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
        className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
      >
        No data to display
      </td>
    </tr>
  );
}

function EditModal({ open, title, row, fields, onClose, onSave }) {
  const [draft, setDraft] = useState(row || {});

  useEffect(() => {
    setDraft(row || {});
  }, [row]);

  if (!open) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Update details and save changes.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => {
            const key = field.key;
            const label = field.label;

            if (field.type === "checkbox") {
              return (
                <label
                  key={key}
                  className="inline-flex items-center gap-2 text-sm font-medium sm:col-span-2"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(draft[key])}
                    onChange={(e) => update(key, e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700"
                  />
                  {label}
                </label>
              );
            }

            if (field.type === "select") {
              return (
                <label key={key} className="block">
                  <span className="text-sm font-medium">{label}</span>
                  <select
                    className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900"
                    value={draft[key] ?? ""}
                    onChange={(e) => update(key, e.target.value)}
                  >
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
                <span className="text-sm font-medium">{label}</span>
                <input
                  type={inputType}
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900"
                  value={draft[key] ?? ""}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={field.placeholder}
                />
              </label>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
    const ok = window.confirm("Delete this record?");
    if (!ok) return;
    if (typeof onDelete === "function") {
      onDelete(row);
      return;
    }

    // fallback local delete if consumer didn't provide onDelete
    setRows((prev) =>
      prev.filter((r) => resolveRowId(r) !== resolveRowId(row)),
    );
    toast.success("Deleted");
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
      <div className="mb-3 flex items-end justify-between gap-3">
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
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
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
