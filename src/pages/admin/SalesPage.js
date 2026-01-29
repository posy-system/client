import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiSearch,
  FiX,
  FiShoppingCart,
  FiCalendar,
} from "react-icons/fi";
import SalesTableCompo from "../../components/tabel/SalesTableCompo";
import InputCompo from "../../components/inputfield/InputCompo";
import ButtonCompo from "../../components/button/ButtonCompo";

/* ================= View Sale Modal ================= */
function ViewSaleModal({ open, sale, onClose }) {
  if (!open || !sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-950">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FiShoppingCart className="text-blue-500" />
            Sale Details
          </h2>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
          >
            <FiX />
          </button>
        </div>

        {/* Sale Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
          <div>
            <p className="text-xs text-slate-600">Sale Date</p>
            <p className="font-medium">
              {new Date(sale.saleDate).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600">Created At</p>
            <p className="font-medium">
              {new Date(sale.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600">Subtotal</p>
            <p className="font-semibold">
              Rs. {sale.subtotal.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-600">Discount</p>
            <p className="font-semibold text-orange-500">
              {sale.discountPercentage}% (Rs.{" "}
              {sale.discountAmount.toFixed(2)})
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-slate-600">Total Amount</p>
            <p className="text-2xl font-bold text-green-600">
              Rs. {sale.totalBillAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <ButtonCompo variant="blue" onClick={onClose}>
            Close
          </ButtonCompo>
        </div>
      </div>
    </div>
  );
}

/* ================= Sales Page ================= */
export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [selectedSale, setSelectedSale] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSales, setTotalSales] = useState(0);
  const limit = 10;

  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalDiscount: 0,
    averageSale: 0,
  });

  /* -------- Fetch Stats -------- */
  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get("/sales/stats/summary");
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  /* -------- Fetch Sales -------- */
  const fetchSales = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const res = await axios.get("/sales", {
          params: { page, limit, sortBy: "-createdAt" },
        });

        if (res.data.success) {
          setSales(res.data.data || []);
          setCurrentPage(res.data.pagination.currentPage);
          setTotalPages(res.data.pagination.totalPages);
          setTotalSales(res.data.pagination.totalSales);
        }
      } catch {
        toast.error("Failed to fetch sales");
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchSales(currentPage);
    fetchStats();
  }, [fetchSales, fetchStats, currentPage]);

  /* -------- Filtering -------- */
  const filteredSales = React.useMemo(() => {
    return sales.filter((sale) => {
      const matchesText =
        !searchTerm ||
        sale._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.items?.some(
          (item) =>
            item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.itemNumber?.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        sale.totalBillAmount?.toString().includes(searchTerm);

      const matchesDate =
        !selectedDate ||
        new Date(sale.saleDate).toISOString().split("T")[0] === selectedDate;

      return matchesText && matchesDate;
    });
  }, [sales, searchTerm, selectedDate]);

  /* -------- Pagination -------- */
  const handlePreviousPage = () =>
    setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  /* ================= JSX ================= */
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 dark:bg-[#19191A]">
          <p className="text-sm text-slate-600">Total Sales</p>
          <p className="mt-2 text-3xl font-bold">{stats.totalSales}</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 dark:bg-[#19191A]">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            Rs. {stats.totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5 dark:bg-[#19191A]">
          <p className="text-sm text-slate-600">Total Discount</p>
          <p className="mt-2 text-3xl font-bold text-yellow-500">
            Rs. {stats.totalDiscount.toFixed(2)}
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-5 dark:bg-[#19191A]">
          <p className="text-sm text-slate-600">Average Sale</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            Rs. {stats.averageSale.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="rounded-2xl border bg-white p-5 dark:bg-[#19191A]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <InputCompo
                type="text"
                placeholder="Search by sale ID, item name, or amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Date input with calendar icon and clear button */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
              <InputCompo
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-10 cursor-pointer"
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
              />
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 z-10"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <SalesTableCompo
        sales={filteredSales}
        loading={loading}
        title={`Sales (${filteredSales.length} of ${totalSales})`}
        onView={(sale) => {
          setSelectedSale(sale);
          setViewModalOpen(true);
        }}
        onDelete={async (sale) => {
          if (!window.confirm("Delete this sale?")) return;
          await axios.delete(`/sales/${sale._id}`);
          fetchSales(currentPage);
          fetchStats();
        }}
      />

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="rounded-2xl border bg-white p-4 dark:bg-[#19191A]">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>
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

      {/* Modal */}
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