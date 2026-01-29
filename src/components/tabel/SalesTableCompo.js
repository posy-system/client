import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FiEye, FiTrash2, FiX } from "react-icons/fi";
import ButtonCompo from "../button/ButtonCompo";

/* ===================== VIEW SALE MODAL ===================== */
function ViewSaleModal({ open, sale, onClose }) {
  if (!open || !sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-blue-500 to-blue-600">
          <h2 className="text-xl font-bold text-white">Sale Details</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full w-9 h-9 bg-white/20 hover:bg-white/30"
          >
            <FiX size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {sale.items.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-xl border-slate-200 dark:border-slate-700"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.itemName}
                  </p>
                  <p className="text-xs text-slate-500">
                    Qty: {item.quantity} × LKR {item.priceAtSale}
                  </p>
                </div>
                <p className="text-sm font-bold text-green-600">
                  LKR {(item.quantity * item.priceAtSale).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Total Bill
            </span>
            <span className="text-lg font-bold text-green-600">
              LKR {sale.totalBillAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
          <ButtonCompo variant="blue" onClick={onClose} className="px-6">
            Close
          </ButtonCompo>
        </div>
      </div>
    </div>
  );
}

/* ===================== DELETE SALE MODAL ===================== */
function DeleteSaleModal({ open, sale, onClose, onConfirm }) {
  if (!open || !sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-red-500 to-red-600">
          <h2 className="text-xl font-bold text-white">Delete Sale</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full w-9 h-9 bg-white/20 hover:bg-white/30"
          >
            <FiX size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6 text-center">
          <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to delete this sale?
          </p>
          <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
            LKR {sale.totalBillAmount.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
          <ButtonCompo variant="blue" onClick={onClose}>
            Cancel
          </ButtonCompo>
          <ButtonCompo variant="red" onClick={() => onConfirm(sale)}>
            Delete
          </ButtonCompo>
        </div>
      </div>
    </div>
  );
}

/* ===================== SALES TABLE ===================== */
export default function SalesTableCompo({
  sales = [],
  onDelete,
  currentPage = 1,
  itemsPerPage = 5,
  totalItems = 0,
  onPageChange,
}) {
  const [viewSale, setViewSale] = useState(null);
  const [deleteSale, setDeleteSale] = useState(null);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const canGoBack = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <>
      <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-left uppercase text-slate-600">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-right uppercase text-slate-600">
                  Total
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-right uppercase text-slate-600">
                  Discount
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-center uppercase text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-center uppercase text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-sm text-center text-slate-500">
                    No sales found
                  </td>
                </tr>
              ) : (
                sales.map((sale) => (
                  <tr key={sale._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      {new Date(sale.saleDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-green-600">
                      LKR {sale.totalBillAmount.toFixed(2)}
                    </td>

                    <td className="px-6 py-4 text-right font-semibold text-yellow-500">
                      {sale.discountPercentage}% (LKR {sale.discountAmount?.toFixed(2) || "0.00"})
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Completed
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setViewSale(sale)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          <FiEye size={16} />
                          View
                        </button>

                        <button
                          onClick={() => setDeleteSale(sale)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================== PAGINATION ===================== */}
      <div className="flex items-center justify-between p-4 mt-6 bg-white border rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages || 1}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => canGoBack && onPageChange(currentPage - 1)}
            disabled={!canGoBack}
            className={`px-4 py-2 text-sm rounded-lg ${
              canGoBack
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800"
            }`}
          >
            ← Back
          </button>

          <button
            onClick={() => canGoNext && onPageChange(currentPage + 1)}
            disabled={!canGoNext}
            className={`px-4 py-2 text-sm rounded-lg ${
              canGoNext
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800"
            }`}
          >
            Next →
          </button>
        </div>
      </div>

      <ViewSaleModal open={!!viewSale} sale={viewSale} onClose={() => setViewSale(null)} />

      <DeleteSaleModal
        open={!!deleteSale}
        sale={deleteSale}
        onClose={() => setDeleteSale(null)}
        onConfirm={(sale) => {
          onDelete(sale);
          setDeleteSale(null);
          toast.success("Sale deleted successfully");
        }}
      />
    </>
  );
}

SalesTableCompo.propTypes = {
  sales: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,
};
