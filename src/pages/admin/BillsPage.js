import React from "react";
import { TableFormat } from '../../components/tabel/TabelCompo';
import BillTableCompo from '../../components/tabel/BillTableCompo';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { GetBills, DeleteBill } from "../../apis/BillApis";


export default function BillsPage() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
  const fetchBills = async () => {
    try {
      const response = await GetBills();
      setBills(response.bills);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };
  fetchBills();
}, []);

  const columns = [
  {
    key: "_id",
    header: "Bill No",
    render: (v) => v || "-"
  },
  
  {
    key: "billDate",
    header: "Bill Date & Time",
    render: (v) => TableFormat.formatDateTime(v),
    muted: true,
  },
];

  const handleDeleteBill = async (row) => {
    try {
      await DeleteBill(row._id);
      setBills((prev) => prev.filter((r) => r._id !== row._id));
      toast.success("Item deleted");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleViewClick = (row) => {
    // console.log(row);
  };

  const handleDownloadClick = (row) => {
    // console.log(row);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#2A2A2C] dark:bg-[#19191A]">
      <div>
        <BillTableCompo
          title="Bills"
          rows={bills}
          columns={columns}
          onView={handleViewClick}
          onDownload={handleDownloadClick}
          onDelete={handleDeleteBill}
        />
      </div>
    </div>
  );
}
