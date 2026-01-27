import React, { useState } from "react";
import InputCompo from "../components/inputfield/InputCompo";
import { FaRegUser } from "react-icons/fa";
import ButtonCompo from "../components/button/ButtonCompo";
import TabelCompo, {
  TableFormat,
  TableWidgets,
} from "../components/tabel/TabelCompo";
import toast from "react-hot-toast";
import DialogBox from "../components/Notification/DialogBox";

const INITIAL_ITEMS = [
  {
    id: "i_001",
    itemName: "Sope",
    itemNumber: 1,
    otherPrice: 10,
    ourPrice: 12,
    quantity: 100,
    available: true,

    imageUrl: 'https://res.cloudinary.com/dj3azxggg/image/upload/v1767970384/items/nkrodyxat9e2uno1lnu1.png',
    createdAt: '2026-01-24T18:50:52.331Z',
    updatedAt: '2026-01-24T19:04:16.826Z',

  },
  {
    id: "i_002",
    itemName: "Shampoo",
    itemNumber: 21,
    otherPrice: 40,
    ourPrice: 45,
    quantity: 32,
    available: true,

    imageUrl: 'https://res.cloudinary.com/dj3azxggg/image/upload/v1767970384/items/nkrodyxat9e2uno1lnu1.png',
    createdAt: '2026-01-23T10:12:00.000Z',
    updatedAt: '2026-01-24T10:12:00.000Z',

  },
  {
    id: "i_003",
    itemName: "Shampoos",
    itemNumber: 21,
    otherPrice: 40,
    ourPrice: 45,
    quantity: 32,
    available: true,

    imageUrl: 'https://res.cloudinary.com/dj3azxggg/image/upload/v1767970384/items/nkrodyxat9e2uno1lnu1.png',
    createdAt: '2026-01-23T10:12:00.000Z',
    updatedAt: '2026-01-24T10:12:00.000Z',

  },
];

export default function HomePage() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleToggleAvailable = (row, nextChecked) => {
    setItems((prev) =>
      prev.map((r) =>
        r.id === row.id
          ? {
              ...r,
              available: nextChecked,
              updatedAt: new Date().toISOString(),
            }
          : r,
      ),
    );
    toast.success("Availability updated");
  };

  const columns = [
    {

      key: 'imageUrl',
      header: 'Image',
      render: (value) => (
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          {value ? (
            <img 
              src={value} 
              alt="Item" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span class="text-xs text-slate-500">No image</span>';
              }}
            />
          ) : (
            <span className="text-xs text-slate-500">No image</span>
          )}
        </div>
      ),

    },
    {
      key: "itemName",
      header: "Item Name",
    },
    {
      key: "itemNumber",
      header: "Item No",
      muted: true,
    },
    {
      key: "otherPrice",
      header: "Other Price",
      align: "right",
      muted: true,
    },
    {
      key: "ourPrice",
      header: "Our Price",
      align: "right",
      muted: true,
    },
    {
      key: "quantity",
      header: "Qty",
      align: "right",
      muted: true,
    },
    {
      key: "available",
      header: "Available",
      render: (value, row) => (
        <TableWidgets.ToggleSwitch
          checked={Boolean(value)}
          onChange={(checked) => handleToggleAvailable(row, checked)}
        />
      ),
      muted: true,
    },
    {
      key: "createdAt",
      header: "Created",
      render: (v) => TableFormat.formatDateTime(v),
      muted: true,
    },
    {
      key: "updatedAt",
      header: "Updated",
      render: (v) => TableFormat.formatDateTime(v),
      muted: true,
    },
  ];

  const editFields = [
    { key: "itemName", label: "Item name", type: "text", required: true },
    { key: "itemNumber", label: "Item number", type: "number", required: true },
    { key: "otherPrice", label: "Other price", type: "number", required: true },
    { key: "ourPrice", label: "Our price", type: "number", required: true },
    { key: "quantity", label: "Quantity", type: "number", required: true },
    { key: "available", label: "Available", type: "checkbox" },
    { key: "imageUrl", label: "Image URL", type: "text" },
  ];

  const handleViewItem = (row) => {
    console.log(row); //only for view
  }

  const handleEditItem = (updatedRow) => {
    setItems((prev) =>
      prev.map((r) => (r.id === updatedRow.id ? updatedRow : r)),
    );
    toast.success("Item updated");
  };

  const handleDeleteItem = (row) => {
    setItems((prev) => prev.filter((r) => r.id !== row.id));
    toast.success("Item deleted");
  };

  return (
    <div className="px-4 pb-8 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">Home Page</h1>

      <InputCompo
        type="text"
        placeholder="Enter something"
        label="fuck"
        icon={<FaRegUser className="text-slate-500 dark:text-slate-300" />}
      />

      <div className="flex flex-wrap gap-3 mt-6">
        <ButtonCompo
          variant="blue"
          onClick={() => alert("Blue button clicked!")}
          icon={<FaRegUser className="text-current" />}
        >
          Blue
        </ButtonCompo>

        <ButtonCompo
          variant="red"
          onClick={() => alert("Red button clicked!")}
          icon={<FaRegUser className="text-current" />}
        >
          Red
        </ButtonCompo>

        <ButtonCompo
          variant="green"
          onClick={() => alert("Green button clicked!")}
          icon={<FaRegUser className="text-current" />}
        >
          Green
        </ButtonCompo>
      </div>

      <div>
        <TabelCompo
          title="Inventory"
          rows={items}
          columns={columns}
          onView={handleViewItem}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          editFields={editFields}
          editTitle="Edit item"
        />
      </div>
      <div className="mt-10"></div>
      <DialogBox />
    </div>
  );
}
