import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiX, FiEye } from "react-icons/fi";
import ButtonCompo from "../button/ButtonCompo";

function ViewModal({ open, item, onClose }) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-blue-500 to-blue-600">
          <h2 className="text-xl font-bold text-white">View Item</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center transition rounded-full w-9 h-9 bg-white/20 hover:bg-white/30"
          >
            <FiX size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {item.imageUrl && (
            <div className="mb-4">
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="object-cover w-full h-48 rounded-lg"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Item Name</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.itemName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Item No</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.itemNumber}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Our Price</p>
              <p className="text-sm font-bold text-green-600">${item.ourPrice}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Other Price</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">${item.otherPrice}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Quantity</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.quantity}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Available</p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {item.available ? <span className="text-green-600">✓ Yes</span> : <span className="text-red-600">✗ No</span>}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
          <ButtonCompo variant="blue" onClick={onClose} className="px-6">
            Close
          </ButtonCompo>
        </div>
      </div>
    </div>
  );
}

function EditModal({ open, item, onClose, onSave }) {
  const [formData, setFormData] = useState(item || {});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    if (!formData.itemName?.trim()) {
      toast.error("Item name is required");
      return;
    }
    onSave(formData);
  };

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-green-500 to-green-600">
          <h2 className="text-xl font-bold text-white">Edit Item</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center transition rounded-full w-9 h-9 bg-white/20 hover:bg-white/30"
          >
            <FiX size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg outline-none border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Item No</label>
              <input
                type="number"
                name="itemNumber"
                value={formData.itemNumber || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-lg outline-none border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Our Price</label>
              <input
                type="number"
                name="ourPrice"
                value={formData.ourPrice || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-lg outline-none border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Other Price</label>
              <input
                type="number"
                name="otherPrice"
                value={formData.otherPrice || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-lg outline-none border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-lg outline-none border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-lg outline-none border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-green-500"
            />
          </div>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800">
            <input
              type="checkbox"
              name="available"
              checked={formData.available || false}
              onChange={handleChange}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Available</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
          <ButtonCompo variant="red" onClick={onClose} className="px-6">
            Cancel
          </ButtonCompo>
          <ButtonCompo variant="green" onClick={handleSave} className="px-6">
            Save
          </ButtonCompo>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ open, item, onClose, onConfirm }) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-red-500 to-red-600">
          <h2 className="text-xl font-bold text-white">Delete Item</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center transition rounded-full w-9 h-9 bg-white/20 hover:bg-white/30"
          >
            <FiX size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-2 text-slate-600 dark:text-slate-300">Are you sure you want to delete:</p>
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.itemName}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">This action cannot be undone.</p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
          <ButtonCompo variant="blue" onClick={onClose} className="px-6">
            Cancel
          </ButtonCompo>
          <ButtonCompo
            variant="red"
            onClick={() => {
              onConfirm(item);
            }}
            className="px-6"
          >
            Delete
          </ButtonCompo>
        </div>
      </div>
    </div>
  );
}

export default function InventoryTableCompo({ 
  items = [], 
  onEdit, 
  onDelete,
  currentPage = 1,
  itemsPerPage = 10,
  totalItems = 0,
  onPageChange,
  showViewButton = true,
  showEditButton = true,
  showDeleteButton = true
}) {
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const canGoBack = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handleView = (item) => {
    setViewItem(item);
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleDelete = (item) => {
    setDeleteItem(item);
  };

  const handleSaveEdit = (updatedItem) => {
    onEdit(updatedItem);
    setEditItem(null);
    toast.success("Item updated successfully");
  };

  const handleConfirmDelete = (item) => {
    onDelete(item);
    setDeleteItem(null);
    toast.success("Item deleted successfully");
  };

  const handlePrevPage = () => {
    if (canGoBack && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (canGoNext && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-left uppercase text-slate-600 dark:text-slate-400">Image</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-left uppercase text-slate-600 dark:text-slate-400">Item Name</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-left uppercase text-slate-600 dark:text-slate-400">Item No</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-right uppercase text-slate-600 dark:text-slate-400">Our Price</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-right uppercase text-slate-600 dark:text-slate-400">Qty</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-center uppercase text-slate-600 dark:text-slate-400">Status</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wide text-center uppercase text-slate-600 dark:text-slate-400">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-sm text-center text-slate-500 dark:text-slate-400">
                    No items to display
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.itemName}
                          className="object-cover w-12 h-12 rounded-lg"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.itemName}</p>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.itemNumber}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-green-600">LKR {item.ourPrice}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm text-slate-900 dark:text-slate-100">{item.quantity}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          item.available
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {item.available ? "Available" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {showViewButton && (
                          <button
                            onClick={() => handleView(item)}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-700 transition bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                          >
                            <FiEye size={16} />
                            View
                          </button>
                        )}
                        {showEditButton && (
                          <button
                            onClick={() => handleEdit(item)}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-700 transition bg-green-100 rounded-lg hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                          >
                            <FiEdit2 size={16} />
                            Edit
                          </button>
                        )}
                        {showDeleteButton && (
                          <button
                            onClick={() => handleDelete(item)}
                            className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-700 transition bg-red-100 rounded-lg hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                          >
                            <FiTrash2 size={16} />
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between p-4 mt-6 bg-white border rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Page <span className="font-semibold text-slate-900 dark:text-slate-100">{currentPage}</span> of{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-100">{totalPages || 1}</span>
          {totalItems > 0 && (
            <span className="ml-4">
              Total items: <span className="font-semibold text-slate-900 dark:text-slate-100">{totalItems}</span>
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrevPage}
            disabled={!canGoBack}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              canGoBack
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"
            }`}
          >
            ← Back
          </button>

          <button
            onClick={handleNextPage}
            disabled={!canGoNext}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              canGoNext
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"
            }`}
          >
            Next →
          </button>
        </div>
      </div>

      <ViewModal open={!!viewItem} item={viewItem} onClose={() => setViewItem(null)} />
      <EditModal open={!!editItem} item={editItem} onClose={() => setEditItem(null)} onSave={handleSaveEdit} />
      <DeleteModal open={!!deleteItem} item={deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleConfirmDelete} />
    </>
  );
}

InventoryTableCompo.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,
  showViewButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
};

ViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
