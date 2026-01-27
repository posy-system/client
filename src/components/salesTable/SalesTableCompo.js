import React from "react";
import PropTypes from "prop-types";
import { FiEye, FiTrash2 } from "react-icons/fi";
import ButtonCompo from "../button/ButtonCompo";

/**
 * SalesTableCompo - A specialized table component for displaying sales data
 * @param {Array} sales - Array of sale objects
 * @param {Function} onView - Callback when view button is clicked
 * @param {Function} onDelete - Callback when delete button is clicked
 * @param {boolean} loading - Loading state
 * @param {string} title - Table title
 */

export default function SalesTableCompo({
  sales = [],
  onView,
  onDelete,
  loading = false,
  title = "Sales",
}) {
  // If loading, show loading state
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Loading sales...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">


      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-[#2A2A2C]">
          <thead className="bg-slate-50 dark:bg-[#202022]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Sale Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Items
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Subtotal
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Discount
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Total Amount
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white dark:divide-[#2A2A2C] dark:bg-[#19191A]">
            {sales.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No sales data to display
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr
                  key={sale._id}
                  className="hover:bg-slate-50/60 dark:hover:bg-[#232325]"
                >
                  {/* Sale Date */}
                  <td className="px-4 py-3 text-sm">
                    {sale.saleDate
                      ? new Date(sale.saleDate).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* Items */}
                  <td className="px-4 py-3 text-sm">
                    {sale.items && Array.isArray(sale.items) && sale.items.length > 0 ? (
                      <div className="space-y-1">
                        {sale.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-medium">
                              {item.itemName || "Unknown"}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400">
                              {" "}
                              × {item.quantity || 0}
                            </span>
                          </div>
                        ))}
                        {sale.items.length > 2 && (
                          <div className="text-xs text-blue-500">
                            +{sale.items.length - 2} more item
                            {sale.items.length - 2 > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400">No items</span>
                    )}
                  </td>

                  {/* Subtotal */}
                  <td className="px-4 py-3 text-right text-sm">
                    <span className="font-medium">
                      Rs.{" "}
                      {typeof sale.subtotal === "number"
                        ? sale.subtotal.toFixed(2)
                        : "0.00"}
                    </span>
                  </td>

                  {/* Discount */}
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="text-orange-500">
                      <div className="font-medium">
                        {sale.discountPercentage || 0}%
                      </div>
                      <div className="text-xs">
                        Rs.{" "}
                        {typeof sale.discountAmount === "number"
                          ? sale.discountAmount.toFixed(2)
                          : "0.00"}
                      </div>
                    </div>
                  </td>

                  {/* Total Amount */}
                  <td className="px-4 py-3 text-right text-sm">
                    <span className="font-bold text-green-600 dark:text-green-500">
                      Rs.{" "}
                      {typeof sale.totalBillAmount === "number"
                        ? sale.totalBillAmount.toFixed(2)
                        : "0.00"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {onView && (
                        <ButtonCompo
                          variant="blue"
                          size="sm"
                          onClick={() => onView(sale)}
                          icon={<FiEye />}
                        >
                          View
                        </ButtonCompo>
                      )}
                      {onDelete && (
                        <ButtonCompo
                          variant="red"
                          size="sm"
                          onClick={() => onDelete(sale)}
                          icon={<FiTrash2 />}
                        >
                          Delete
                        </ButtonCompo>
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
  );
}

SalesTableCompo.propTypes = {
  sales: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      saleDate: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          itemName: PropTypes.string,
          itemNumber: PropTypes.string,
          quantity: PropTypes.number,
          priceAtSale: PropTypes.number,
        })
      ),
      subtotal: PropTypes.number,
      discountPercentage: PropTypes.number,
      discountAmount: PropTypes.number,
      totalBillAmount: PropTypes.number,
    })
  ),
  onView: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
  title: PropTypes.string,
};