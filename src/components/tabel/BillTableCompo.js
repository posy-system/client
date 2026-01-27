import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FiTrash2, FiX, FiEye, FiDownload, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

function isSameDate(date1, date2) {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
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

function DateFilter({ selectedDate, onDateChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-slate-300 dark:border-[#2A2A2C] bg-white dark:bg-[#19191A] px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#232325] transition-colors"
      >
        <FiCalendar className="h-4 w-4" />
        {selectedDate ? new Date(selectedDate).toLocaleDateString() : "Filter by Date"}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 z-20 rounded-lg border border-slate-200 dark:border-[#2A2A2C] bg-white dark:bg-[#19191A] p-4 shadow-xl">
            <input
              type="date"
              value={selectedDate || ""}
              onChange={(e) => {
                onDateChange(e.target.value);
                setIsOpen(false);
              }}
              className="rounded-lg border border-slate-300 dark:border-[#2A2A2C] bg-white dark:bg-[#232325] px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {selectedDate && (
              <button
                onClick={() => {
                  onClear();
                  setIsOpen(false);
                }}
                className="mt-2 w-full rounded-lg bg-slate-100 dark:bg-[#232325] px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2A2A2C] transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-slate-200 dark:border-[#2A2A2C]">
      <span className="text-sm text-slate-600 dark:text-slate-400 mr-4">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-lg border border-slate-300 dark:border-[#2A2A2C] bg-white dark:bg-[#19191A] px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#232325] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FiChevronLeft className="h-4 w-4" />
        Previous
      </button>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-lg border border-slate-300 dark:border-[#2A2A2C] bg-white dark:bg-[#19191A] px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#232325] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ViewModal({ isOpen, onClose, pdfUrl, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative w-[600px] h-[500px] rounded-2xl bg-white dark:bg-[#19191A] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-slate-100 dark:bg-[#2A2A2C] p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#3A3A3C] transition-colors"
          aria-label="Close modal"
        >
          <FiX className="h-5 w-5" />
        </button>

        {/* Header */}
        {title && (
          <div className="border-b border-slate-200 dark:border-[#2A2A2C] px-6 py-4 flex-shrink-0">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h2>
          </div>
        )}

        {/* PDF Container */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title={title || 'PDF Preview'}
          />
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, billInfo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#19191A] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center pt-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <FiTrash2 className="h-8 w-8 text-red-600 dark:text-red-500" />            
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Are you sure you want to <b className="text-red-600 dark:text-red-500">delete this bill?</b> This action cannot be undone.
          </p>
          
          {billInfo && (
            <div className="rounded-lg bg-slate-50 dark:bg-[#232325] px-4 py-3 text-left">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                Bill Details
              </p>
              {billInfo.salesId && (
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-medium">ID:</span> {billInfo.salesId}
                </p>
              )}
              {billInfo._id && (
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-medium">Bill No:</span> {billInfo._id.slice(-8)}
                </p>
              )}
              {billInfo.billDate && (
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-medium">Date:</span> {new Date(billInfo.billDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 dark:border-[#2A2A2C] bg-white dark:bg-[#232325] px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#2A2A2C] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable table component with date filtering and pagination
 */
export default function BillTableCompo({
  title = "Table",
  rows: rowsProp = [],
  columns = [],
  getRowId,
  dateFilterKey = "billDate", // The key in your data to filter by date
  itemsPerPage = 10,
  onView,
  onDownload,
  onDelete,
}) {
  const isControlled = Array.isArray(rowsProp);
  const [rows, setRows] = useState(isControlled ? rowsProp : []);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [billToDelete, setBillToDelete] = useState(null);

  useEffect(() => {
    if (isControlled) setRows(rowsProp);
  }, [isControlled, rowsProp]);

  const resolveRowId = useMemo(() => {
    if (typeof getRowId === "function") return getRowId;
    return (row) => row?.id ?? row?._id;
  }, [getRowId]);

  // Filter rows by date
  const filteredRows = useMemo(() => {
    if (!selectedDate) return rows || [];
    return (rows || []).filter((row) => {
      const rowDate = row[dateFilterKey];
      return isSameDate(rowDate, selectedDate);
    });
  }, [rows, selectedDate, dateFilterKey]);

  // Paginate filtered rows
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRows.slice(startIndex, endIndex);
  }, [filteredRows, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate]);

  const showActions =
    typeof onDownload === "function" ||
    typeof onDelete === "function" ||
    typeof onView === "function";

  const handleViewClick = (row) => {
    if (typeof onView === "function") {
      setViewModalOpen(true);
      setSelectedRow(row);
      onView(row);
    }
  };

  const handleDownloadClick = async (row) => {
    if (typeof onDownload === "function") {
      onDownload(row);
      return;
    }

    // Default download behavior if no custom handler provided
    if (!row.billUrl) {
      toast.error("No PDF URL available");
      return;
    }

    try {
      toast.loading("Downloading...", { id: "download" });

      // Fetch the PDF
      const response = await fetch(row.billUrl);
      if (!response.ok) throw new Error("Download failed");

      // Get the blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      // Generate filename from row data
      const filename = `bill_${row._id || row.salesId || Date.now()}.pdf`;
      link.download = filename;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Downloaded successfully", { id: "download" });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download PDF", { id: "download" });
    }
  };

  const handleDeleteClick = (row) => {
    setDeleteModalOpen(true);
    setBillToDelete(row);
  };

  const handleConfirmDelete = () => {
    if (!billToDelete) return;

    if (typeof onDelete === "function") {
      onDelete(billToDelete);
    } else {
      // fallback local delete if consumer didn't provide onDelete
      setRows((prev) =>
        prev.filter((r) => resolveRowId(r) !== resolveRowId(billToDelete)),
      );
      toast.success("Deleted");
    }

    // Close modal and reset
    setDeleteModalOpen(false);
    setBillToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setBillToDelete(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClearDate = () => {
    setSelectedDate("");
  };

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {selectedDate
              ? `Showing ${filteredRows.length} bills on ${new Date(selectedDate).toLocaleDateString()}`
              : `Total: ${filteredRows.length}`}
          </p>
        </div>

        <DateFilter
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onClear={handleClearDate}
        />
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
              {paginatedData.length === 0 ? (
                <DefaultEmpty
                  colSpan={columns.length + (showActions ? 1 : 0)}
                />
              ) : (
                paginatedData.map((row) => (
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
                              variant="green"
                              size="sm"
                              onClick={() => handleViewClick(row)}
                              icon={<FiEye />}
                            >
                              View
                            </ButtonCompo>
                          )}
                          {typeof onDownload === "function" && (
                            <ButtonCompo
                              variant="blue"
                              size="sm"
                              onClick={() => handleDownloadClick(row)}
                              icon={<FiDownload />}
                            >
                              Download
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <ViewModal
        isOpen={viewModalOpen}
        title={selectedRow?.salesId}
        pdfUrl={selectedRow?.billUrl}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedRow(null);
        }}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        billInfo={billToDelete}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />
    </div>
  );
}

BillTableCompo.propTypes = {
  title: PropTypes.string,
  rows: PropTypes.array,
  columns: PropTypes.array,
  getRowId: PropTypes.func,
  dateFilterKey: PropTypes.string,
  itemsPerPage: PropTypes.number,
  onView: PropTypes.func,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

DateFilter.propTypes = {
  selectedDate: PropTypes.string,
  onDateChange: PropTypes.func,
  onClear: PropTypes.func,
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

ViewModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  pdfUrl: PropTypes.string,
  title: PropTypes.string,
};

DeleteConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  billInfo: PropTypes.object,
};

// Helpers you can use in column renderers
export const TableFormat = {
  formatDateTime,
};

export const TableWidgets = {
  ToggleSwitch,
};