import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { GetAllInventoryItems } from "../../apis/InventoryApis";
import InventoryTableCompo from "../../components/tabel/InventoryTableCompo";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // from API (don’t try to guess from items.length)
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage]);
  const endIndex = useMemo(() => startIndex + itemsPerPage - 1, [startIndex]);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        setLoading(true);

        const res = await GetAllInventoryItems({ startIndex, endIndex });
        console.log("Fetched inventory items:", res);

        // ✅ YOUR API RETURNS: { data: [...], totalItems, totalPages, currentPage }
        if (res && Array.isArray(res.data)) {
          setItems(res.data);
          setTotalItems(res.totalItems ?? res.data.length);
          setTotalPages(res.totalPages ?? Math.ceil((res.totalItems ?? res.data.length) / itemsPerPage));
        } else {
          setItems([]);
          setTotalItems(0);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching inventory items:", error);
        toast.error("Failed to fetch inventory items");
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, [startIndex, endIndex, itemsPerPage]);

  const handleEdit = (updatedItem) => {
    // ✅ Mongo uses _id
    setItems((prev) => prev.map((it) => (it._id === updatedItem._id ? updatedItem : it)));
  };

  const handleDelete = (deletedItem) => {
    setItems((prev) => prev.filter((it) => it._id !== deletedItem._id));
    setTotalItems((prev) => Math.max(0, prev - 1));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A] h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inventory Management</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage your inventory items</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-slate-600 dark:text-slate-400">Loading items...</div>
        </div>
      ) : (
        <InventoryTableCompo
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showViewButton={true}
          showEditButton={true}
          showDeleteButton={true}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
