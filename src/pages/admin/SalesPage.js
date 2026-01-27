import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSearch, FiX, FiShoppingCart } from "react-icons/fi";
import SalesTableCompo from "../../components/salesTable/SalesTableCompo";
import InputCompo from "../../components/inputfield/InputCompo";
import ButtonCompo from "../../components/button/ButtonCompo";

// View Sale Details Modal Component
function ViewSaleModal({ open, sale, onClose }) {
  if (!open || !sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-950">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiShoppingCart className="text-blue-500" />
              Sale Details
            </h2>
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

        {/* Sale Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Sale Date
            </p>
            <p className="font-medium">
              {new Date(sale.saleDate).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Created At
            </p>
            <p className="font-medium">
              {new Date(sale.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Subtotal
            </p>
            <p className="font-medium text-lg">
              Rs. {sale.subtotal.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Discount
            </p>
            <p className="font-medium text-lg text-orange-500">
              {sale.discountPercentage}% (Rs. {sale.discountAmount.toFixed(2)})
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Total Amount
            </p>
            <p className="font-bold text-2xl text-green-600 dark:text-green-500">
              Rs. {sale.totalBillAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Sale Items</h3>
          <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                    Item Number
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                    Item Name
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                {sale.items && sale.items.length > 0 ? (
                  sale.items.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className="hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-mono">
                        {item.itemNumber}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {item.itemName}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        Rs. {item.priceAtSale.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        Rs. {(item.quantity * item.priceAtSale).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-8 text-center text-sm text-slate-500"
                    >
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-3 text-sm font-semibold text-right"
                  >
                    Subtotal:
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-right">
                    Rs. {sale.subtotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-3 text-sm font-semibold text-right text-orange-600"
                  >
                    Discount ({sale.discountPercentage}%):
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-right text-orange-600">
                    - Rs. {sale.discountAmount.toFixed(2)}
                  </td>
                </tr>
                <tr className="border-t-2 border-slate-300 dark:border-slate-700">
                  <td
                    colSpan="5"
                    className="px-4 py-3 text-base font-bold text-right"
                  >
                    Total Amount:
                  </td>
                  <td className="px-4 py-3 text-base font-bold text-right text-green-600 dark:text-green-500">
                    Rs. {sale.totalBillAmount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <ButtonCompo variant="blue" onClick={onClose}>
            Close
          </ButtonCompo>
        </div>
      </div>
    </div>
  );
}

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSales, setTotalSales] = useState(0);
  const [limit] = useState(10);

  // Statistics states
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalDiscount: 0,
    averageSale: 0,
  });

  // Fetch sales statistics
  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get("/sales/stats/summary");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  // Fetch all sales
  const fetchSales = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const response = await axios.get("/sales", {
          params: {
            page,
            limit,
            sortBy: "-createdAt",
          },
        });

        if (response.data.success) {
          setSales(response.data.data || []);
          setCurrentPage(response.data.pagination.currentPage);
          setTotalPages(response.data.pagination.totalPages);
          setTotalSales(response.data.pagination.totalSales);
        }
      } catch (error) {
        console.error("Error fetching sales:", error);
        toast.error(error.response?.data?.message || "Failed to fetch sales");
        setSales([]);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  // Initial fetch
  useEffect(() => {
    fetchSales(currentPage);
    fetchStats();
  }, [currentPage, fetchSales, fetchStats]);

  // Handle view sale
  const handleViewSale = useCallback((sale) => {
    setSelectedSale(sale);
    setViewModalOpen(true);
  }, []);

  // Handle delete sale
  const handleDeleteSale = useCallback(
    async (sale) => {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete this sale?\nSale ID: ${sale._id}\nTotal Amount: Rs. ${sale.totalBillAmount.toFixed(2)}`
      );

      if (!confirmDelete) return;

      try {
        const response = await axios.delete(`/sales/${sale._id}`);
        if (response.data.success) {
          toast.success("Sale deleted successfully");
          fetchSales(currentPage);
          fetchStats();
        }
      } catch (error) {
        console.error("Error deleting sale:", error);
        toast.error(error.response?.data?.message || "Failed to delete sale");
      }
    },
    [currentPage, fetchSales, fetchStats]
  );

  // Filter sales based on search term
  const filteredSales = React.useMemo(() => {
    if (!searchTerm || !sales || sales.length === 0) return sales;

    const searchLower = searchTerm.toLowerCase();

    return sales.filter((sale) => {
      // Search in sale ID
      if (sale._id && sale._id.toLowerCase().includes(searchLower)) return true;

      // Search in items
      if (sale.items && Array.isArray(sale.items)) {
        const hasMatchingItem = sale.items.some(
          (item) =>
            (item.itemName &&
              item.itemName.toLowerCase().includes(searchLower)) ||
            (item.itemNumber &&
              item.itemNumber.toLowerCase().includes(searchLower))
        );
        if (hasMatchingItem) return true;
      }

      // Search in total amount
      if (
        sale.totalBillAmount &&
        sale.totalBillAmount.toString().includes(searchTerm)
      ) {
        return true;
      }

      return false;
    });
  }, [sales, searchTerm]);

  // Handle page change
  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Total Sales
          </p>
          <p className="mt-2 text-3xl font-bold">{stats.totalSales || 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Total Revenue
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-500">
            Rs.{" "}
            {typeof stats.totalRevenue === "number"
              ? stats.totalRevenue.toFixed(2)
              : "0.00"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Total Discount
          </p>
          <p className="mt-2 text-3xl font-bold text-orange-600">
            Rs.{" "}
            {typeof stats.totalDiscount === "number"
              ? stats.totalDiscount.toFixed(2)
              : "0.00"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Average Sale
          </p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            Rs.{" "}
            {typeof stats.averageSale === "number"
              ? stats.averageSale.toFixed(2)
              : "0.00"}
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <InputCompo
              type="text"
              placeholder="Search by sale ID, item name, or amount..."
              icon={<FiSearch />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <SalesTableCompo
        sales={filteredSales}
        onView={handleViewSale}
        onDelete={handleDeleteSale}
        loading={loading}
        title={`Sales (${filteredSales.length} of ${totalSales})`}
      />

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <ButtonCompo
                variant="blue"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </ButtonCompo>
              <ButtonCompo
                variant="blue"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </ButtonCompo>
            </div>
          </div>
        </div>
      )}

      {/* View Sale Modal */}
      <ViewSaleModal
        open={viewModalOpen}
        sale={selectedSale}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedSale(null);
        }}
      />
    </div>
  );
}