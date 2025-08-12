import React, { useState } from "react";
import { X } from "lucide-react";

// interface AddProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
// }

export default function AddProductModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    subCategory: "",
    vendor: "",
    store: "",
    images: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, images: formData.images.split(",").map((img) => img.trim()) });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative border border-gray-700">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

        {/* الحقول */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category ID"
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />
          <input
            type="text"
            name="subCategory"
            placeholder="Subcategory ID"
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />
          <input
            type="text"
            name="vendor"
            placeholder="Vendor ID"
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />
          <input
            type="text"
            name="store"
            placeholder="Store ID"
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />
          <input
            type="text"
            name="images"
            placeholder="Image URLs (comma separated)"
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="bg-gray-800 border border-gray-700 rounded-lg p-3 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={3}
          onChange={handleChange}
        />

        {/* الأزرار */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
